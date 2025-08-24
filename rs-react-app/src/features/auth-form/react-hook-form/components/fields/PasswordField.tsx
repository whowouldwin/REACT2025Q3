import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function PasswordField({ register, error }: FieldWithRegisterProps) {
  return (
    <Field label="Password" htmlFor="c_password" error={error}>
      <input
        id="c_password"
        type="password"
        placeholder="Password"
        className={inputClass}
        {...register('password')}
      />
    </Field>
  );
}
