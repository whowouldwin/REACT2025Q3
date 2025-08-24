import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmailField } from './EmailField';

describe('EmailField', () => {
  it('renders email input with label', () => {
    render(<EmailField />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('name', 'email');
  });

  it('shows error message if provided', () => {
    const errorText = 'Email is required';
    render(<EmailField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
