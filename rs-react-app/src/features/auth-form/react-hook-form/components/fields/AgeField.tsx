import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function AgeField({ register, error }: FieldWithRegisterProps) {
  return (
    <Field label="Age" htmlFor="c_age" error={error}>
      <input
        id="c_age"
        type="number"
        placeholder="Age"
        className={inputClass}
        {...register('age', { valueAsNumber: true })}
      />
    </Field>
  );
}
