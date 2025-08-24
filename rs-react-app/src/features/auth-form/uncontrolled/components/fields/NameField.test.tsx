import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NameField } from './NameField';

describe('NameField', () => {
  it('renders input with label', () => {
    render(<NameField />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('name', 'name');
  });

  it('shows error message if provided', () => {
    const errorText = 'Name is required';
    render(<NameField error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
