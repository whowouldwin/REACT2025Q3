import { describe, it, expect } from 'vitest';
import {
  calcPasswordStrength,
  isStrongPassword,
} from '@/shared/lib/password/passwordStrength.ts';

describe('calcPasswordStrength', () => {
  it('returns 0 for empty string', () => {
    expect(calcPasswordStrength('').score).toBe(0);
  });

  it('counts each rule at most once, even if repeated', () => {
    expect(calcPasswordStrength('1111').score).toBe(1);
    expect(calcPasswordStrength('aaaa').score).toBe(1);
    expect(calcPasswordStrength('AAAA').score).toBe(1);
    expect(calcPasswordStrength('!!!!').score).toBe(1);
    expect(calcPasswordStrength('AaAa').score).toBe(2);
    expect(calcPasswordStrength('A1A1').score).toBe(2);
    expect(calcPasswordStrength('a1a1').score).toBe(2);
    expect(calcPasswordStrength('Aa1a').score).toBe(3);
    expect(calcPasswordStrength('Aa!a').score).toBe(3);
  });

  it('returns 4 only when all categories are present', () => {
    expect(calcPasswordStrength('Aa1!').score).toBe(4);
    expect(calcPasswordStrength('zZ9#moreText').score).toBe(4);
  });

  it('treats non-alphanumeric chars as special', () => {
    expect(calcPasswordStrength('Aa1_').score).toBe(4);
  });
});

describe('isStrongPassword', () => {
  it('is false for undefined or empty', () => {
    expect(isStrongPassword(undefined)).toBe(false);
    expect(isStrongPassword('')).toBe(false);
  });

  it('is true only if all four categories are present', () => {
    expect(isStrongPassword('Aa1!')).toBe(true);
    expect(isStrongPassword('Password1!')).toBe(true);

    expect(isStrongPassword('Password1')).toBe(false);
    expect(isStrongPassword('password1!')).toBe(false);
    expect(isStrongPassword('PASSWORD1!')).toBe(false);
    expect(isStrongPassword('Password!!')).toBe(false);
  });
});
