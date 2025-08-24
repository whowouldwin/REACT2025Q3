import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { GenderField } from './GenderField';
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
        <GenderField register={methods.register} error={error} />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('GenderField', () => {
  it('renders select with label and options', () => {
    render(<TestForm />);
    const select = screen.getByLabelText(/gender/i);
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument();
  });

  it('submits selected gender value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.selectOptions(screen.getByLabelText(/gender/i), 'female');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    const submitted = onSubmit.mock.calls[0][0] as FormValues;
    expect(submitted.gender).toBe('female');
  });

  it('shows error message if provided', () => {
    render(<TestForm error="Gender is required" />);
    expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
  });
});
