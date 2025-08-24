import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useImagePicker } from './useImagePicker';

const h = vi.hoisted(() => ({
  imageFileToBase64Mock: vi.fn().mockResolvedValue('data:image/png;base64,xxx'),
}));

vi.mock('@/shared/lib/imageToBase/imageToBase64', () => ({
  imageFileToBase64: h.imageFileToBase64Mock,
}));

vi.mock('./constants', () => ({
  IMAGE_MIME_WHITELIST: ['image/png', 'image/jpeg'],
  MAX_IMAGE_BYTES: 2 * 1024 * 1024,
}));
function TestComp() {
  const { hiddenInputRef, errorMessage, handleFileChange } = useImagePicker();
  return (
    <div>
      <input aria-label="file" type="file" onChange={handleFileChange} />
      <input
        aria-label="hidden"
        ref={hiddenInputRef}
        name="pictureBase64"
        type="hidden"
      />
      <div aria-label="error">{errorMessage}</div>
    </div>
  );
}

describe('useImagePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets error for invalid type', async () => {
    render(<TestComp />);
    const fileInput = screen.getByLabelText('file') as HTMLInputElement;
    const badFile = new File(['x'], 'a.gif', { type: 'image/gif' });

    fireEvent.change(fileInput, { target: { files: [badFile] } });

    await waitFor(() => {
      expect(screen.getByLabelText('error')).toHaveTextContent(
        /png\/jpeg, ≤ 2mb/i
      );
    });
    expect(h.imageFileToBase64Mock).not.toHaveBeenCalled();
  });

  it('sets error for too large file', async () => {
    render(<TestComp />);
    const fileInput = screen.getByLabelText('file') as HTMLInputElement;
    const bigBlob = new Blob(['a'.repeat(2 * 1024 * 1024 + 1)], {
      type: 'image/png',
    });
    const bigFile = new File([bigBlob], 'big.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [bigFile] } });

    await waitFor(() => {
      expect(screen.getByLabelText('error')).toHaveTextContent(
        /png\/jpeg, ≤ 2mb/i
      );
    });
    expect(h.imageFileToBase64Mock).not.toHaveBeenCalled();
  });

  it('calls converter for valid file and clears error', async () => {
    render(<TestComp />);
    const fileInput = screen.getByLabelText('file') as HTMLInputElement;
    const okFile = new File(['x'], 'ok.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [okFile] } });

    await waitFor(() => {
      expect(h.imageFileToBase64Mock).toHaveBeenCalledTimes(1);
      expect(h.imageFileToBase64Mock).toHaveBeenCalledWith(okFile);
      expect(screen.getByLabelText('error')).toHaveTextContent('');
    });
  });

  it('does nothing when no file selected', () => {
    render(<TestComp />);
    const fileInput = screen.getByLabelText('file') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [] } });

    expect(h.imageFileToBase64Mock).not.toHaveBeenCalled();
    expect(screen.getByLabelText('error')).toHaveTextContent('');
  });
});
