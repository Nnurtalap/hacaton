import React, { useState } from 'react';
import { useUpdateThresholdsMutation } from '../store/api';

export const SettingsPanel = () => {
  const [clean, setClean] = useState(0.9);
  const [damage, setDamage] = useState(0.2);

  const [updateThresholds, { data, isLoading, isSuccess }] = useUpdateThresholdsMutation();

  const handleUpdate = () => {
    updateThresholds({
      clean_threshold: clean,
      damage_threshold: damage,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-10">
      <h3 className="text-lg font-bold mb-4">Настройки AI-модели</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="clean" className="block text-sm font-medium text-gray-700">
            Порог чистоты: <strong>{clean.toFixed(2)}</strong>
          </label>
          <input
            id="clean"
            type="range"
            min="0.1"
            max="0.99"
            step="0.05"
            value={clean}
            onChange={(e) => setClean(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="damage" className="block text-sm font-medium text-gray-700">
            Порог повреждения: <strong>{damage.toFixed(2)}</strong>
          </label>
          <input
            id="damage"
            type="range"
            min="0.1"
            max="0.99"
            step="0.05"
            value={damage}
            onChange={(e) => setDamage(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        disabled={isLoading}
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isLoading ? 'Обновление...' : 'Применить настройки'}
      </button>
      {isSuccess && data && (
        <div className="mt-2 text-sm text-green-600">
          Успешно! Новые пороги: Clean={data.clean_threshold}, Damage={data.damage_threshold}
        </div>
      )}
    </div>
  );
};
