import { Upload } from 'lucide-react';
import React from 'react';

interface IImage {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileSelect: () => void;
}

export default function ImageUpLoader({
  fileInputRef,
  handleFileChange,
  triggerFileSelect,
}: IImage) {
  return (
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
  );
}
