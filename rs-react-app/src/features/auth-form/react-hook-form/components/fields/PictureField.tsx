import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';
import type { ChangeEventHandler } from 'react';

type Props = FieldWithRegisterProps & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  extraError?: string;
};

export function PictureField({ register, error, onChange, extraError }: Props) {
  return (
    <Field
      label="Picture (png/jpeg, ≤ 2MB)"
      htmlFor="c_picture"
      error={extraError || error}
    >
      <input
        id="c_picture"
        type="file"
        accept="image/png,image/jpeg"
        className={inputClass}
        onChange={onChange}
      />
      <input type="hidden" {...register('pictureBase64')} />
    </Field>
  );
}
