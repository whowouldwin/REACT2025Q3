import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GenderField } from './GenderField';

describe('GenderField', () => {
  it('renders select with label', () => {
    render(<GenderField />);
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toHaveAttribute('name', 'gender');
  });

  it('renders all options', () => {
    render(<GenderField />);
    expect(screen.getByRole('option', { name: /^male$/i })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /^female$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /^other$/i })
    ).toBeInTheDocument();
  });

  it('shows error message if provided', () => {
    const errorText = 'Gender is required';
    render(<GenderField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
