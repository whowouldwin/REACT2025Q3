import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import { PictureField } from './PictureField';
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
  onChangeSpy,
  error,
  extraError,
}: {
  onSubmit?: (d: FormValues) => void;
  onChangeSpy?: () => void;
  error?: string;
  extraError?: string;
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    methods.setValue('pictureBase64', 'data:image/png;base64,TEST');
    onChangeSpy?.();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}>
        <PictureField
          register={methods.register}
          error={error}
          extraError={extraError}
          onChange={handleChange}
        />
        {onSubmit && <button type="submit">Submit</button>}
      </form>
    </FormProvider>
  );
}

describe('PictureField', () => {
  it('renders file input with label and accept filter', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/picture/i);
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('id', 'c_picture');
    expect(input).toHaveAttribute('accept', 'image/png,image/jpeg');
  });

  it('updates hidden pictureBase64 via onChange and submits it', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onChangeSpy = vi.fn();

    render(<TestForm onSubmit={onSubmit} onChangeSpy={onChangeSpy} />);

    const fileInput = screen.getByLabelText(/picture/i) as HTMLInputElement;
    const file = new File(['x'], 'avatar.png', { type: 'image/png' });
    await user.upload(fileInput, file);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    const submitted = onSubmit.mock.calls[0][0] as FormValues;
    expect(submitted.pictureBase64).toBe('data:image/png;base64,TEST');
  });

  it('shows extraError over error when both provided', () => {
    render(<TestForm error="Backend error" extraError="Too large" />);
    expect(screen.getByText(/too large/i)).toBeInTheDocument();
  });
});
