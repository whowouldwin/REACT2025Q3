import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { PictureField } from './PictureField';

describe('PictureField', () => {
  it('renders file input with label', () => {
    const onPickFile = vi.fn();
    const hiddenRef = createRef<HTMLInputElement>();
    render(<PictureField onPickFile={onPickFile} hiddenRef={hiddenRef} />);

    const fileInput = screen.getByLabelText(/picture \(png\/jpeg, ≤ 2mb\)/i, {
      selector: 'input',
    });
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/png,image/jpeg');
  });

  it('calls onPickFile when a file is selected', () => {
    const onPickFile = vi.fn();
    const hiddenRef = createRef<HTMLInputElement>();
    render(<PictureField onPickFile={onPickFile} hiddenRef={hiddenRef} />);

    const fileInput = screen.getByLabelText(/picture \(png\/jpeg, ≤ 2mb\)/i, {
      selector: 'input',
    });
    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onPickFile).toHaveBeenCalledTimes(1);
  });

  it('renders hidden base64 input with correct name', () => {
    const onPickFile = vi.fn();
    const hiddenRef = createRef<HTMLInputElement>();
    const { container } = render(
      <PictureField onPickFile={onPickFile} hiddenRef={hiddenRef} />
    );

    const hidden = container.querySelector(
      'input[type="hidden"][name="pictureBase64"]'
    );
    expect(hidden).not.toBeNull();
    expect(hiddenRef.current).toBe(hidden);
  });

  it('shows error message if provided', () => {
    const onPickFile = vi.fn();
    const hiddenRef = createRef<HTMLInputElement>();
    const errorText = 'Invalid file';
    render(
      <PictureField
        error={errorText}
        onPickFile={onPickFile}
        hiddenRef={hiddenRef}
      />
    );

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
