import { useState, useRef, useEffect, useMemo } from 'react';
import { useGetBatchMutation, usePredictMutation, useUpdateThresholdsMutation } from '../store/api';
import { handleThresholdUpdate } from '../utils/handleThresholdUpdate';
import ThresholdForm from '../ui/ThresholdForm';
import ImageUpLoader from '../ui/imageUpLoader';
import AnalizeResult from '../ui/AnalizeResult';
import { ICombane } from '../ui/Combane';

export const CarAnalyzer = () => {
  const [cleanThreshold, setCleanThreshold] = useState('');
  const [damageThreshold, setDamageThreshold] = useState('');
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const [predictSingle, { data: singleResult, isLoading: isSingleLoading, error: singleError }] =
    usePredictMutation();
  const [predictBatch, { data: batchResult, isLoading: isBatchLoading, error: batchError }] =
    useGetBatchMutation();

  const [updateThresholds, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateThresholdsMutation();

  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [combinedData, setCombinedData] = useState<ICombane[]>([]);

  const isLoading = isSingleLoading || isBatchLoading;
  const rawError = singleError || batchError;

  const apiError = rawError
    ? {
        status:
          'status' in rawError
            ? String(rawError.status)
            : 'message' in rawError
            ? rawError.message
            : 'Неизвестная ошибка',
      }
    : null;
  const resultsArray = useMemo(() => {
    return singleResult ? [singleResult] : batchResult ? batchResult.results : null;
  }, [singleResult, batchResult]);

  useEffect(() => {
    if (previews.length > 0 && resultsArray && previews.length === resultsArray.length) {
      const combined: ICombane[] = previews.map((previewSrc, index) => ({
        preview: previewSrc,
        result: resultsArray[index],
      }));
      setCombinedData(combined);
    }
  }, [previews, resultsArray]);

  const handleReset = () => {
    setPreviews([]);
    setFilesToUpload([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files); // FileList → File[]
    setFilesToUpload(fileArray);

    const filePreviews = fileArray.map((file) => URL.createObjectURL(file));
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

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
    console.log(12345566790);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      {previews.length === 0 ? (
        <ImageUpLoader
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          triggerFileSelect={triggerFileSelect}
        />
      ) : (
        <div>
          <div className="mb-6"></div>

          <h2 className="text-lg font-bold text-gray-800 mb-4">Результаты анализа:</h2>
          <AnalizeResult
            isLoading={isLoading}
            apiError={apiError}
            filesToUpload={filesToUpload}
            handleReset={handleReset}
            combinedData={combinedData}
          />

          <ThresholdForm
            cleanThreshold={cleanThreshold}
            setCleanThreshold={setCleanThreshold}
            damageThreshold={damageThreshold}
            setDamageThreshold={setDamageThreshold}
            handleUpdate={() =>
              handleThresholdUpdate({
                cleanThreshold,
                damageThreshold,
                updateThresholds,
                filesToUpload,
                predictSingle,
                predictBatch,
              })
            }
            updateSuccess={updateSuccess}
            updateError={updateError}
          />
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
