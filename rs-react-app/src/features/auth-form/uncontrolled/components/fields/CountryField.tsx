import { Field } from '@/shared/field';
export function CountryField({ error }: { error?: string }) {
  return (
    <Field label="Country" htmlFor="u_country" error={error}>
      <input
        id="u_country"
        name="country"
        className="w-full rounded-xl border px-3 py-2"
      />
    </Field>
  );
}
