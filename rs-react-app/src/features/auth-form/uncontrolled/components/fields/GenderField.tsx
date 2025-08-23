import { Field } from '@/shared/field';
export function GenderField({ error }: { error?: string }) {
  return (
    <Field label="Gender" htmlFor="u_gender" error={error}>
      <select
        id="u_gender"
        name="gender"
        className="w-full rounded-xl border px-3 py-2"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </Field>
  );
}
