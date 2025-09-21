import { Loader2 } from 'lucide-react';
import React from 'react';
import Combane, { ICombane } from './Combane';

export interface IAnalize {
  isLoading: boolean;
  apiError: {
    status?: string;
  } | null;
  filesToUpload: File[];
  handleReset: () => void;
  combinedData: ICombane[];
}

export default function AnalizeResult({
  isLoading,
  apiError,
  filesToUpload,
  handleReset,
  combinedData,
}: IAnalize) {
  return (
    <div className="space-y-3">
      {isLoading && (
        <div className="flex justify-center items-center p-4 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Анализируем...</span>
        </div>
      )}
      {apiError && <p className="text-red-500 text-sm">Ошибка при анализе: {apiError.status}</p>}
      {filesToUpload.length > 5 ? (
        <>
          <div className="text-red-400 font-bold">можно добавить небольше пяти картинок</div>
          {handleReset()}
        </>
      ) : null}

      <Combane combinedData={combinedData} />
    </div>
  );
}
