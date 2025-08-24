import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { TermsField } from './TermsField';
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
        <TermsField register={methods.register} error={error} />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('TermsField', () => {
  it('renders checkbox with label', () => {
    render(<TestForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /i accept the terms/i,
    });
    expect(checkbox).toBeInTheDocument();
  });

  it('submits checked value as true', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.click(
      screen.getByRole('checkbox', { name: /i accept the terms/i })
    );
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0].termsAccepted).toBe(true);
  });

  it('shows error text when provided', () => {
    render(<TestForm error="You must accept the terms" />);
    expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
  });
});
