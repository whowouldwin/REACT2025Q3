import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import React, { createRef } from 'react';
import { UncontrolledForm } from './UncontrolledForm';

const dispatchMock = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
}));

vi.stubGlobal('crypto', { randomUUID: () => 'uuid-1' });

const validateMock = vi.fn();
vi.mock('@/features/auth-form/uncontrolled', () => ({
  uncontrolledSchema: {
    validate: (...args: unknown[]) => validateMock(...args),
  },
}));

const parseYupErrorsMock = vi.fn();
vi.mock('@/features/auth-form/uncontrolled/lib/parseYupErrors', () => ({
  parseYupErrors: (e: unknown) => parseYupErrorsMock(e),
}));

vi.mock('@/entities/registration', () => ({
  registrationActions: {
    addEntry: (payload: unknown) => ({ type: 'ADD', payload }),
  },
}));

vi.mock('@/features/auth-form/uncontrolled/lib/useImagePicker', () => ({
  useImagePicker: () => {
    const hiddenInputRef = createRef<HTMLInputElement>();
    return { hiddenInputRef, errorMessage: '', handleFileChange: vi.fn() };
  },
}));

const FieldWrapper = ({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div>
    <label htmlFor={htmlFor}>{label}</label>
    {children}
    {error ? <div>{error}</div> : null}
  </div>
);

vi.mock('@/features/auth-form/uncontrolled/components/fields', () => {
  const NameField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Name" htmlFor="u_name" error={error}>
      <input id="u_name" name="name" />
    </FieldWrapper>
  );
  const AgeField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Age" htmlFor="u_age" error={error}>
      <input id="u_age" name="age" type="number" />
    </FieldWrapper>
  );
  const EmailField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Email" htmlFor="u_email" error={error}>
      <input id="u_email" name="email" type="email" />
    </FieldWrapper>
  );
  const PasswordField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Password" htmlFor="u_password" error={error}>
      <input id="u_password" name="password" type="password" />
    </FieldWrapper>
  );
  const ConfirmPasswordField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Confirm password" htmlFor="u_confirm" error={error}>
      <input id="u_confirm" name="confirmPassword" type="password" />
    </FieldWrapper>
  );
  const GenderField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Gender" htmlFor="u_gender" error={error}>
      <select id="u_gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </FieldWrapper>
  );
  const CountryField = ({ error }: { error?: string }) => (
    <FieldWrapper label="Country" htmlFor="u_country" error={error}>
      <input id="u_country" name="country" />
    </FieldWrapper>
  );
  const PictureField = ({
    error,
    onPickFile,
    hiddenRef,
  }: {
    error?: string;
    onPickFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hiddenRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <FieldWrapper label="Picture" htmlFor="u_picture" error={error}>
      <input id="u_picture" type="file" onChange={onPickFile} />
      <input ref={hiddenRef} name="pictureBase64" type="hidden" />
    </FieldWrapper>
  );
  const TermsCheckbox = ({ error }: { error?: string }) => (
    <div>
      <label>
        <input name="termsAccepted" type="checkbox" />
        <span>I accept the terms</span>
      </label>
      {error ? <div>{error}</div> : null}
    </div>
  );
  return {
    AgeField,
    ConfirmPasswordField,
    CountryField,
    EmailField,
    GenderField,
    NameField,
    PasswordField,
    PictureField,
    TermsCheckbox,
  };
});

describe('UncontrolledForm', () => {
  beforeEach(() => {
    dispatchMock.mockReset();
    validateMock.mockReset();
    parseYupErrorsMock.mockReset();
  });

  it('submits valid form and dispatches addEntry', async () => {
    validateMock.mockResolvedValueOnce(undefined);
    const onSuccess = vi.fn();
    const { container } = render(<UncontrolledForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@ex.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Passw0rd!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Passw0rd!' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: 'PL' },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: 'male' },
    });
    fireEvent.click(
      screen.getByRole('checkbox', { name: /i accept the terms/i })
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"][name="pictureBase64"]'
    ) as HTMLInputElement | null;
    if (hiddenInput)
      Object.defineProperty(hiddenInput, 'value', {
        value: 'data:image/png;base64,xxx',
        writable: true,
      });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(validateMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledTimes(1));
    expect(onSuccess).toHaveBeenCalled();
  });

  it('shows validation errors on reject', async () => {
    validateMock.mockRejectedValueOnce(new Error('invalid'));
    parseYupErrorsMock.mockReturnValueOnce({ name: 'Name is required' });

    render(<UncontrolledForm onSuccess={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(parseYupErrorsMock).toHaveBeenCalled());
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
