import { Field } from '@/shared/field';
export function AgeField({ error }: { error?: string }) {
  return (
    <Field label="Age" htmlFor="u_age" error={error}>
      <input
        id="u_age"
        name="age"
        type="number"
        className="w-full rounded-xl border px-3 py-2"
      />
    </Field>
  );
}
