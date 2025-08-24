import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { RegistrationEntry } from '@/entities/registration';
import { RegistrationTile } from './RegistrationTile';

const mockEntry: RegistrationEntry = {
  id: 'u1',
  name: 'John Doe',
  gender: 'male',
  email: 'john@example.com',
  password: 'secret',
  age: 30,
  country: 'USA',
  termsAccepted: true,
  pictureBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
  source: 'rhf',
};

describe('RegistrationTile', () => {
  it('renders user data correctly', () => {
    render(<RegistrationTile entry={mockEntry} />);

    expect(screen.getByRole('img', { name: /user picture/i })).toHaveAttribute(
      'src',
      mockEntry.pictureBase64
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Email: john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
  });

  it('applies highlighted styles when highlighted=true', () => {
    const { container } = render(
      <RegistrationTile entry={mockEntry} highlighted />
    );
    const root = container.firstElementChild;
    expect(root).toHaveClass('border-emerald-500');
    expect(root).toHaveClass('ring-2');
    expect(root).toHaveClass('bg-emerald-50');
  });
});
