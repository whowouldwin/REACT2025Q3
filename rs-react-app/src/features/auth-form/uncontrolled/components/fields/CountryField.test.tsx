import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountryField } from './CountryField';

describe('CountryField', () => {
  it('renders input with label', () => {
    render(<CountryField />);
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toHaveAttribute(
      'name',
      'country'
    );
  });

  it('shows error message if provided', () => {
    const errorText = 'Country is required';
    render(<CountryField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
