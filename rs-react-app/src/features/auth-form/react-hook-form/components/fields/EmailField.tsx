import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function EmailField({ register, error }: FieldWithRegisterProps) {
  return (
    <Field label="Email" htmlFor="c_email" error={error}>
      <input
        id="c_email"
        type="email"
        placeholder="Email"
        className={inputClass}
        {...register('email')}
      />
    </Field>
  );
}
