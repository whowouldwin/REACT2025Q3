import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { NameField } from './NameField';
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
        <NameField register={methods.register} error={error} />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('NameField', () => {
  it('renders input with label and placeholder', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/name/i);
    expect(input).toHaveAttribute('id', 'c_name');
    expect(input).toHaveAttribute('placeholder', 'Name');
  });

  it('submits name value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    const submitted = onSubmit.mock.calls[0][0] as FormValues;
    expect(submitted.name).toBe('Alice');
  });

  it('shows error message if provided', () => {
    render(<TestForm error="Name is required" />);
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
});
