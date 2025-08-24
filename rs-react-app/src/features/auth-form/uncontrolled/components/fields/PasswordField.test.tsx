import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PasswordField } from './PasswordField';

describe('PasswordField', () => {
  it('renders password input with label', () => {
    render(<PasswordField />);
    const input = screen.getByLabelText(/password/i, { selector: 'input' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
  });

  it('updates password value and shows meter', () => {
    render(<PasswordField />);
    const input = screen.getByLabelText(/password/i, { selector: 'input' });
    fireEvent.change(input, { target: { value: 'secret123' } });
    expect(input).toHaveValue('secret123');
    expect(
      screen.getByRole('meter', { name: /password strength/i })
    ).toBeInTheDocument();
  });

  it('shows error message if provided', () => {
    const errorText = 'Password is required';
    render(<PasswordField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
