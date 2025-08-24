import { Field } from '@/shared/field';
import type { FieldWithRegisterProps } from '../../model/types';
import { inputClass } from '@/shared/field/ui/inputClass.ts';

export function NameField({ register, error }: FieldWithRegisterProps) {
  return (
    <Field label="Name" htmlFor="c_name" error={error}>
      <input
        id="c_name"
        placeholder="Name"
        className={inputClass}
        {...register('name')}
      />
    </Field>
  );
}
