import { Field } from '@/shared/field';
export function EmailField({ error }: { error?: string }) {
  return (
    <Field label="Email" htmlFor="u_email" error={error}>
      <input
        id="u_email"
        name="email"
        type="email"
        className="w-full rounded-xl border px-3 py-2"
      />
    </Field>
  );
}
