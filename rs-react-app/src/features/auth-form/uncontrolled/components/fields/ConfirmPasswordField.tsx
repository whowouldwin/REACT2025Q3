import { Field } from '@/shared/field';
export function ConfirmPasswordField({ error }: { error?: string }) {
  return (
    <Field label="Confirm password" htmlFor="u_confirm" error={error}>
      <input
        id="u_confirm"
        name="confirmPassword"
        type="password"
        className="w-full rounded-xl border px-3 py-2"
      />
    </Field>
  );
}
