import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { ConfirmPasswordField } from './ConfirmPasswordField';
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
        <ConfirmPasswordField register={methods.register} error={error} />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('ConfirmPasswordField', () => {
  it('renders input with label and placeholder', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/confirm password/i);
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('placeholder', 'Confirm password');
  });

  it('submits confirmPassword value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/confirm password/i), '12345');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    const submitted = onSubmit.mock.calls[0][0] as FormValues;
    expect(submitted.confirmPassword).toBe('12345');
  });

  it('shows error message if provided', () => {
    render(<TestForm error="Must match password" />);
    expect(screen.getByText(/must match password/i)).toBeInTheDocument();
  });
});
