import { describe, it, expect } from 'vitest';
import { cx } from './cx';

describe('cx', () => {
  it('merges conditional classes like clsx', () => {
    const result = cx('base', false, { active: true, hidden: false });
    expect(result).toBe('base active');
  });

  it('merges tailwind classes with twMerge (later wins)', () => {
    const result = cx('p-2', 'p-4', 'bg-red-500', 'bg-blue-500');
    expect(result).toBe('p-4 bg-blue-500');
  });

  it('works with arrays of class names', () => {
    const result = cx(['m-2', 'rounded'], ['shadow', false]);
    expect(result).toBe('m-2 rounded shadow');
  });
});
