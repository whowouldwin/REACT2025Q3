import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { PasswordField } from './PasswordField';
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
        <PasswordField register={methods.register} error={error} />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('PasswordField', () => {
  it('renders input with label, type and placeholder', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute('id', 'c_password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('placeholder', 'Password');
  });

  it('submits password value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(d: FormValues) => void>();
    render(<TestForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/password/i), 'secret123!');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0].password).toBe('secret123!');
  });

  it('shows error message when provided', () => {
    render(<TestForm error="Password is required" />);
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
