import type { FieldProps } from '../model/types.ts';
import { cx } from '@/shared/lib/a11y/cx/cx.ts';

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
      {children}
      <div
        id={errorId}
        className={cx(
          'min-h-[1.25rem] text-sm',
          error ? 'text-red-600' : 'text-transparent'
        )}
        aria-live="polite"
      >
        {error}
      </div>
    </div>
  );
}
