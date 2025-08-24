import { describe, it, expect, vi } from 'vitest';
import { validateAndConvertImage } from './validateAndConvertImage';

vi.mock('./imageToBase64', () => ({
  imageFileToBase64: vi.fn(async () => 'base64mock'),
}));

describe('validateAndConvertImage', () => {
  const makeFile = (opts: Partial<File> & { size?: number; type?: string }) =>
    new File(['dummy'], 'test.png', {
      type: opts.type ?? 'image/png',
    });

  it('rejects non-image types', async () => {
    const file = makeFile({ type: 'text/plain' });
    const res = await validateAndConvertImage(file);
    expect(res.error).toMatch(/Only PNG or JPEG/);
  });

  it('rejects files larger than maxSizeMB', async () => {
    const bigFile = makeFile({ type: 'image/png' });
    Object.defineProperty(bigFile, 'size', { value: 3 * 1024 * 1024 });
    const res = await validateAndConvertImage(bigFile, { maxSizeMB: 2 });
    expect(res.error).toMatch(/must not exceed/);
  });

  it('returns base64 string for valid PNG/JPEG', async () => {
    const okFile = makeFile({ type: 'image/png' });
    const res = await validateAndConvertImage(okFile);
    expect(res.base64).toBe('base64mock');
    expect(res.error).toBeUndefined();
  });
});
