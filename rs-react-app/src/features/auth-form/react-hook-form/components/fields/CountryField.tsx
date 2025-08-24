import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function CountryField({ register, error }: FieldWithRegisterProps) {
  return (
    <Field label="Country" htmlFor="c_country" error={error}>
      <input
        id="c_country"
        placeholder="Country"
        className={inputClass}
        {...register('country')}
      />
    </Field>
  );
}
