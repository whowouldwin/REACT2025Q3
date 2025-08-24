import { describe, it, expect } from 'vitest';
import { ValidationError } from 'yup';
import { parseYupErrors } from './parseYupErrors';

describe('parseYupErrors', () => {
  it('returns empty object for non-ValidationError', () => {
    expect(parseYupErrors('oops')).toEqual({});
    expect(parseYupErrors({})).toEqual({});
    expect(parseYupErrors(null)).toEqual({});
  });

  it('maps single error with path', () => {
    const err = new ValidationError('Required', undefined, 'email');
    expect(parseYupErrors(err)).toEqual({ email: 'Required' });
  });

  it('prefers first message for duplicate paths in inner', () => {
    const e1 = new ValidationError('First', undefined, 'name');
    const e2 = new ValidationError('Second', undefined, 'name');
    const err = new ValidationError('Ignored', undefined, undefined);
    err.inner = [e1, e2];
    expect(parseYupErrors(err)).toEqual({ name: 'First' });
  });

  it('collects multiple inner errors with distinct paths', () => {
    const e1 = new ValidationError('Invalid email', undefined, 'email');
    const e2 = new ValidationError('Too young', undefined, 'age');
    const err = new ValidationError('Invalid', undefined, undefined);
    err.inner = [e1, e2];
    expect(parseYupErrors(err)).toEqual({
      email: 'Invalid email',
      age: 'Too young',
    });
  });

  it('adds top-level error when path not present in inner', () => {
    const e1 = new ValidationError('Invalid email', undefined, 'email');
    const err = new ValidationError('Too young', undefined, 'age');
    err.inner = [e1];
    expect(parseYupErrors(err)).toEqual({
      email: 'Invalid email',
      age: 'Too young',
    });
  });

  it('does not override inner error with top-level duplicate path', () => {
    const e1 = new ValidationError('Invalid email', undefined, 'email');
    const err = new ValidationError('Other email issue', undefined, 'email');
    err.inner = [e1];
    expect(parseYupErrors(err)).toEqual({ email: 'Invalid email' });
  });
});
