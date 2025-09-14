import { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';
import { useGetBatchMutation, usePredictMutation } from '../store/api';

const ResultTag = ({ status }) => {
  const icons = {
    чистая: <CheckCircle className="w-4 h-4" />,
    грязная: <X className="w-4 h-4" />,
    оптимально: <CheckCircle className="w-4 h-4" />,
    повреждена: <AlertCircle className="w-4 h-4" />,
  };
  return (
    <div className="flex items-center gap-2">
      <span>{icons[status]}</span>
      <span>{status}</span>
    </div>
  );
};

export const CarAnalyzer = () => {
  const [previews, setPreviews] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const fileInputRef = useRef(null);
  const [combinedData, setCombinedData] = useState([]);

  const [error, setError] = useState(null);

  const [predictSingle, { data: singleResult, isLoading: isSingleLoading, error: singleError }] =
    usePredictMutation();
  const [predictBatch, { data: batchResult, isLoading: isBatchLoading, error: batchError }] =
    useGetBatchMutation();

  const isLoading = isSingleLoading || isBatchLoading;
  const apiError = singleError || batchError;
  const resultsArray = singleResult ? [singleResult] : batchResult ? batchResult.results : null;

  useEffect(() => {
    if (previews.length > 0 && resultsArray && previews.length === resultsArray.length) {
      const combined = previews.map((previewSrc, index) => ({
        preview: previewSrc,
        result: resultsArray[index],
      }));
      setCombinedData(combined);
    }
  }, [previews, resultsArray]);
  console.log(combinedData);
  const handleFileChange = (event) => {
    const file = Array.from(event.target.files);
    if (file.length === 0) return;

    handleReset();

    if (file.length > 5) {
      setError('Можно выбрать не более 5 файлов.');
      return;
    }

    setError(null);
    setFilesToUpload(file);

    const filePreviews = file.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  useEffect(() => {
    if (filesToUpload.length === 0) return;

    if (filesToUpload.length === 1) {
      predictSingle(filesToUpload[0]);
    } else {
      predictBatch(filesToUpload);
    }
  }, [filesToUpload, predictSingle, predictBatch]);

  const handleReset = () => {
    setPreviews([]);
    setFilesToUpload([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      {previews.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Оценка состояния автомобиля</h2>
          <p className="text-gray-500 mt-2 mb-6">Загрузите фото для автоматического анализа</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            multiple
          />

          <button
            onClick={triggerFileSelect}
            className="cursor-pointer w-full flex justify-center items-center gap-2 bg-[#ff8b00] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#e67c00] transition-colors duration-300"
          >
            <Upload className="w-5 h-5 " />
            Выбрать фотографию
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6"></div>

          <h2 className="text-lg font-bold text-gray-800 mb-4">Результаты анализа:</h2>

          <div className="space-y-3">
            {isLoading && (
              <div className="flex justify-center items-center p-4 text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Анализируем...</span>
              </div>
            )}
            {apiError && (
              <p className="text-red-500 text-sm">Ошибка при анализе: {apiError.status}</p>
            )}

            {combinedData.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                <img
                  src={item.preview}
                  alt={`Предпросмотр ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
                {item.result ? (
                  <div className="p-3 bg-gray-50">
                    <div className="flex justify-between items-center text-sm">
                      <span>Чистота:</span>
                      <ResultTag
                        status={
                          item.result.cleanliness.prediction === 'dirty' ? 'грязная' : 'чистая'
                        }
                      />
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Целостность:</span>
                      <ResultTag
                        className="flex "
                        status={
                          item.result.integrity.prediction === 'damaged'
                            ? 'повреждена'
                            : 'оптимально'
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 flex justify-center items-center">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full mt-8 bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Проверить другое фото
          </button>
        </div>
      )}
    </div>
  );
};
