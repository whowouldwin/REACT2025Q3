import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function GenderField({ register, error }: FieldWithRegisterProps) {
  return (
    <Field label="Gender" htmlFor="c_gender" error={error}>
      <select id="c_gender" className={inputClass} {...register('gender')}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </Field>
  );
}
