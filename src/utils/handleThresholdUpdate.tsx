interface I {
  cleanThreshold: string;
  damageThreshold: string;
  updateThresholds: any;
  filesToUpload: File[];
  predictSingle: any;
  predictBatch: any;
}

export const handleThresholdUpdate = async ({
  cleanThreshold,
  damageThreshold,
  updateThresholds,
  filesToUpload,
  predictSingle,
  predictBatch,
}: I) => {
  if (!cleanThreshold || !damageThreshold) {
    return alert('Заполните оба порога!');
  }

  try {
    await updateThresholds({
      clean_threshold: parseFloat(cleanThreshold),
      damage_threshold: parseFloat(damageThreshold),
    }).unwrap();

    if (filesToUpload.length === 1) {
      predictSingle(filesToUpload[0]);
    } else if (filesToUpload.length > 1) {
      predictBatch(filesToUpload);
    }
  } catch (error) {
    console.error('Ошибка при обновлении порогов:', error);
  }
};
