import { describe, expect, it } from 'vitest';

import { FetchError } from '../features/error/FetchError.ts';

describe('FetchError', () => {
  it('should create an error-boundary with correct name and message', () => {
    const error = new FetchError('Failed to fetch');
    expect(error).toBeInstanceOf(FetchError);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('FetchError');
    expect(error.message).toBe('Failed to fetch');
  });
});
