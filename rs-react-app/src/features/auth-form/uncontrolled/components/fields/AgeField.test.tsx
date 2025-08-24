import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AgeField } from './AgeField';

describe('AgeField', () => {
  it('renders input with label', () => {
    render(<AgeField />);
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveAttribute('name', 'age');
  });

  it('shows error message if provided', () => {
    const errorText = 'Age is required';
    render(<AgeField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
