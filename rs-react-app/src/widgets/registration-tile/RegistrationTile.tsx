import type { RegistrationEntry } from '@/entities/registration';
import { cx } from '@/shared/lib/a11y/cx/cx.ts';

type Props = { entry: RegistrationEntry; highlighted?: boolean };

export function RegistrationTile({ entry, highlighted }: Props) {
  return (
    <div
      className={cx(
        'rounded-2xl border bg-white p-4 shadow-sm transition-all duration-500',
        highlighted
          ? 'border-emerald-500 ring-2 ring-emerald-300 bg-emerald-50'
          : 'border-slate-200'
      )}
    >
      <h3 className="mb-2 text-lg font-semibold">{entry.name}</h3>
      <p className="text-sm text-slate-500">Email: {entry.email}</p>
      <p className="text-sm text-slate-500">Age: {entry.age}</p>
      <p className="text-sm text-slate-500">Country: {entry.country}</p>
    </div>
  );
}
