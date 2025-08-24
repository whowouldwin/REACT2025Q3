import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PasswordMeter } from './PasswordMeter';

vi.mock('@/shared/lib/password/passwordStrength.ts', () => ({
  calcPasswordStrength: vi.fn(),
}));
import { calcPasswordStrength } from '@/shared/lib/password/passwordStrength.ts';

const setScore = (n: number) =>
  vi.mocked(calcPasswordStrength).mockReturnValue({ score: n });

describe('PasswordMeter (simple)', () => {
  it('reflects score in aria-valuenow and active segments', () => {
    setScore(0);
    const { rerender } = render(<PasswordMeter value="foo" />);
    let meter = screen.getByRole('meter', { name: /password strength/i });
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '4');
    expect(meter).toHaveAttribute('aria-valuenow', '0');

    let segments = meter.querySelectorAll(':scope > div');
    let active = [...segments].filter((el) =>
      el.classList.contains('bg-green-500')
    );
    expect(segments.length).toBe(4);
    expect(active.length).toBe(0);
    setScore(3);
    rerender(<PasswordMeter value="bar" />);

    meter = screen.getByRole('meter', { name: /password strength/i });
    expect(meter).toHaveAttribute('aria-valuenow', '3');

    segments = meter.querySelectorAll(':scope > div');
    active = [...segments].filter((el) =>
      el.classList.contains('bg-green-500')
    );
    expect(active.length).toBe(3);
  });
});
