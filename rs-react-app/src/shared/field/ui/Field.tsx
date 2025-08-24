import type { FieldProps } from '../model/types.ts';
import { cx } from '@/shared/lib/a11y/cx/cx.ts';
import { AlertCircle } from 'lucide-react';

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: FieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className={cx('mb-3', className)}>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        {error && (
          <AlertCircle
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
            size={18}
          />
        )}
      </div>
      <div
        id={errorId}
        className={cx(
          'mt-1 min-h-[1.25rem] text-sm transition-colors',
          error ? 'text-red-600' : 'text-transparent'
        )}
        aria-live="polite"
      >
        {error}
      </div>
    </div>
  );
}
