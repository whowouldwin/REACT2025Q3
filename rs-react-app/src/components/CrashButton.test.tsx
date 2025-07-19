import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CrashButton } from './CrashButton.tsx';

describe('CrashButton', () => {
  it('calls onCrash function when clicked', () => {
    const mockOnCrash = vi.fn();
    render(<CrashButton onCrash={mockOnCrash} />);
    const button = screen.getByRole('button', { name: 'Error Button' });
    fireEvent.click(button);
    expect(mockOnCrash).toHaveBeenCalled();
  });
});
