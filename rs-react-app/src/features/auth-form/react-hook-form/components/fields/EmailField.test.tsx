import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { EmailField } from './EmailField';
import type { Gender } from '@/entities/registration';

type FormValues = {
  age: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  termsAccepted: boolean;
  pictureBase64: string | null;
  country: string;
};

function TestForm({
  onSubmit,
  error,
}: {
  onSubmit?: (d: FormValues) => void;
  error?: string;
}) {
  const methods = useForm<FormValues>({
    defaultValues: {
      age: 0,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      termsAccepted: false,
      pictureBase64: null,
      country: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}>
        <EmailField register={methods.register} error={error} />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('EmailField', () => {
  it('renders input with label, type, and placeholder', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute('id', 'c_email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Email');
  });

  it('submits email value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    const submitted = onSubmit.mock.calls[0][0] as FormValues;
    expect(submitted.email).toBe('test@example.com');
  });

  it('shows error message if provided', () => {
    render(<TestForm error="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
