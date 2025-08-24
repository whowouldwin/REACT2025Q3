import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConfirmPasswordField } from './ConfirmPasswordField';

describe('ConfirmPasswordField', () => {
  it('renders password input with label', () => {
    render(<ConfirmPasswordField />);
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute(
      'type',
      'password'
    );
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute(
      'name',
      'confirmPassword'
    );
  });

  it('shows error message if provided', () => {
    const errorText = 'Passwords must match';
    render(<ConfirmPasswordField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
