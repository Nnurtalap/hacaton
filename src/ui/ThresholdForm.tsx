import React, { HTMLAttributeAnchorTarget } from 'react';
import Alert from '@mui/material/Alert';
import { CheckIcon } from 'lucide-react';

interface IThresholdForm {
  cleanThreshold: string;
  setCleanThreshold: (value: string) => void;
  damageThreshold: string;
  setDamageThreshold: (value: string) => void;
  updateSuccess: boolean;
  updateError: boolean;
  handleUpdate: () => void;
}

export default function ThresholdForm({
  cleanThreshold,
  setCleanThreshold,
  damageThreshold,
  setDamageThreshold,
  updateSuccess,
  updateError,
  handleUpdate,
}: IThresholdForm) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Обновить пороги модели</h3>
      <div className="flex flex-col gap-3">
        <input
          type="number"
          step="0.01"
          placeholder="clean_threshold (например 0.9)"
          className="border p-2 rounded"
          value={cleanThreshold}
          onChange={(e) => setCleanThreshold(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="damage_threshold (например 0.2)"
          className="border p-2 rounded"
          value={damageThreshold}
          onChange={(e) => setDamageThreshold(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Обновить пороги
        </button>
        {updateSuccess && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Пороги успешно обновлены
          </Alert>
        )}
        {updateError && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Ошибка при обновлении порогов.
          </Alert>
        )}{' '}
      </div>
    </div>
  );
}
