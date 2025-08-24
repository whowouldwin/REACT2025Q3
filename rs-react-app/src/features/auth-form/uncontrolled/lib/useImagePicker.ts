import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { imageFileToBase64 } from '@/shared/lib/imageToBase/imageToBase64';
import { IMAGE_MIME_WHITELIST, MAX_IMAGE_BYTES } from './constants';

export function useImagePicker() {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const isValidType = IMAGE_MIME_WHITELIST.includes(file.type);
    const isValidSize = file.size <= MAX_IMAGE_BYTES;
    if (!isValidType || !isValidSize) {
      setErrorMessage('png/jpeg, ≤ 2MB');
      return;
    }
    const base64 = await imageFileToBase64(file);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = base64;
    }
    setErrorMessage('');
  }
  return {
    hiddenInputRef,
    errorMessage,
    handleFileChange,
  };
}
