import React from 'react';
import { ResultTag } from '../utils/ResultTag';
import { Loader2 } from 'lucide-react';

export interface ICombane {
  preview: string;
  result?: {
    cleanliness: {
      prediction: 'clear' | 'dirty';
      threshold_used: number;
    };
    integrity: {
      prediction: 'intact' | 'damaged';
      threshold_used: number;
    };
    processing_time: number;
    timestamp: string;
  };
}

export interface ICombaneMap {
  combinedData: ICombane[];
}

export default function Combane({ combinedData }: ICombaneMap) {
  return (
    <>
      {combinedData.map((item: any, index: number) => (
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
                  status={item.result.cleanliness.prediction === 'dirty' ? 'грязная' : 'чистая'}
                />{' '}
                <span className="text-xs text-gray-500">
                  (порог: {item.result.cleanliness.threshold_used})
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span>Целостность:</span>
                <ResultTag
                  status={
                    item.result.integrity.prediction === 'damaged' ? 'повреждена' : 'оптимально'
                  }
                />
                <span className="text-xs text-gray-500">
                  (порог: {item.result.integrity.threshold_used})
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gray-50 flex justify-center items-center">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
