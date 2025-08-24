export async function imageFileToBase64(file: File): Promise<string> {
  const reader = new FileReader();

  return await new Promise((resolve, reject) => {
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64 string'));
      }
    };

    reader.onerror = () => reject(new Error('Error while reading file'));
    reader.readAsDataURL(file);
  });
}
