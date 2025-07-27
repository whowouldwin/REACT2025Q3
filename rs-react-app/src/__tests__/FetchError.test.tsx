import { describe, expect, it } from 'vitest';

import { FetchError } from '../error/FetchError.ts';

describe('FetchError', () => {
  it('should create an error with correct name and message', () => {
    const error = new FetchError('Failed to fetch');
    expect(error).toBeInstanceOf(FetchError);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('FetchError');
    expect(error.message).toBe('Failed to fetch');
  });
});
