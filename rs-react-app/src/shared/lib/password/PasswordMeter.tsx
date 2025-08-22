import { calcPasswordStrength } from '@/shared/lib/password/passwordStrength.ts';
import { cx } from '@/shared/lib/a11y/cx/cx.ts';

interface PasswordMeterProps {
  value: string;
}

export function PasswordMeter({ value }: PasswordMeterProps) {
  const { score } = calcPasswordStrength(value);

  const totalSegments = 4;
  const segments = Array.from({ length: totalSegments });

  return (
    <div
      className="mb-1 flex gap-1"
      aria-label="Password strength"
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={totalSegments}
    >
      {segments.map((_, index) => {
        const isActive = index < score;
        return (
          <div
            key={index}
            className={cx(
              'h-2 flex-1 rounded',
              isActive ? 'bg-green-500' : 'bg-gray-300'
            )}
          />
        );
      })}
    </div>
  );
}
