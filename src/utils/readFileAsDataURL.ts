export const readFileAsDataURL = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as DataURL'));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};