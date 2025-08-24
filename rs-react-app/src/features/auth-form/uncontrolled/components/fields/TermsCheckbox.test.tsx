import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TermsCheckbox } from './TermsCheckbox';

describe('TermsCheckbox', () => {
  it('renders checkbox with label', () => {
    render(<TermsCheckbox />);
    const checkbox = screen.getByLabelText(/i accept the terms/i, {
      selector: 'input',
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', 'termsAccepted');
  });

  it('toggles when clicked', () => {
    render(<TermsCheckbox />);
    const checkbox = screen.getByLabelText(/i accept the terms/i, {
      selector: 'input',
    });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('shows error message if provided', () => {
    const errorText = 'You must accept the terms';
    render(<TermsCheckbox error={errorText} />);
    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
