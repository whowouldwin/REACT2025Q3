import { Field } from '@/shared/field';
import type { ChangeEvent } from 'react';
import type React from 'react';

export function PictureField({
  error,
  onPickFile,
  hiddenRef,
}: {
  error?: string;
  onPickFile: (e: ChangeEvent<HTMLInputElement>) => void;
  hiddenRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <Field label="Picture (png/jpeg, ≤ 2MB)" htmlFor="u_picture" error={error}>
      <input
        id="u_picture"
        type="file"
        accept="image/png,image/jpeg"
        onChange={onPickFile}
      />
      <input ref={hiddenRef} name="pictureBase64" type="hidden" />
    </Field>
  );
}
