import { Field } from '@/shared/field';
export function NameField({ error }: { error?: string }) {
  return (
    <Field label="Name" htmlFor="u_name" error={error}>
      <input
        id="u_name"
        name="name"
        className="w-full rounded-xl border px-3 py-2"
      />
    </Field>
  );
}
