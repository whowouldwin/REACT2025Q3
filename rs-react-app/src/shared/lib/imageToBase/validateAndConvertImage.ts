import { imageFileToBase64 } from './imageToBase64';

export async function validateAndConvertImage(
  file?: File,
  { maxSizeMB = 2 } = {}
): Promise<{ base64?: string; error?: string }> {
  if (!file) return {};

  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    return { error: 'Only PNG or JPEG images are allowed' };
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return { error: `File size must not exceed ${maxSizeMB} MB` };
  }

  return { base64: await imageFileToBase64(file) };
}
