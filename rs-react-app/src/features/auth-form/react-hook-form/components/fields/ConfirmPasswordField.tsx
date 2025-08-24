import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function ConfirmPasswordField({
  register,
  error,
}: FieldWithRegisterProps) {
  return (
    <Field label="Confirm password" htmlFor="c_confirm" error={error}>
      <input
        id="c_confirm"
        type="password"
        placeholder="Confirm password"
        className={inputClass}
        {...register('confirmPassword')}
      />
    </Field>
  );
}
