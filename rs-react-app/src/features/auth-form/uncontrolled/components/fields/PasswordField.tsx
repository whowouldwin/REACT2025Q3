import { Field } from '@/shared/field';
import { useState } from 'react';
import { PasswordMeter } from '@/shared/lib/password/PasswordMeter';

type Props = { error?: string };

export function PasswordField({ error }: Props) {
  const [password, setPassword] = useState('');

  return (
    <Field label="Password" htmlFor="u_password" error={error}>
      <input
        id="u_password"
        name="password"
        type="password"
        className="w-full rounded-xl border px-3 py-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordMeter value={password} />
    </Field>
  );
}
