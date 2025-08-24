import { type FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import {
  type Gender,
  registrationActions,
  type RegistrationEntry,
} from '@/entities/registration';
import { uncontrolledSchema } from '@/features/auth-form/uncontrolled';
import type { FormErrors } from '@/features/auth-form/uncontrolled/lib/errorTypes';
import { parseYupErrors } from '@/features/auth-form/uncontrolled/lib/parseYupErrors';
import { useImagePicker } from '@/features/auth-form/uncontrolled/lib/useImagePicker';

import {
  AgeField,
  ConfirmPasswordField,
  CountryField,
  EmailField,
  GenderField,
  NameField,
  PasswordField,
  PictureField,
  TermsCheckbox,
} from '@/features/auth-form/uncontrolled/components/fields';

type Props = { onSuccess: () => void };

export function UncontrolledForm({ onSuccess }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<FormErrors>({});
  const {
    hiddenInputRef,
    errorMessage: pictureErr,
    handleFileChange,
  } = useImagePicker();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const payload: Omit<RegistrationEntry, 'id'> & {
      confirmPassword?: string;
    } = {
      name: String(fd.get('name') || ''),
      gender: (String(fd.get('gender') || '') as Gender) || 'other',
      email: String(fd.get('email') || ''),
      password: String(fd.get('password') || ''),
      age: Number(fd.get('age') || 0),
      country: String(fd.get('country') || ''),
      termsAccepted: Boolean(fd.get('termsAccepted')),
      pictureBase64: String(fd.get('pictureBase64') || '') || undefined,
      source: 'uncontrolled',
      confirmPassword: String(fd.get('confirmPassword') || ''),
    };

    try {
      await uncontrolledSchema.validate(payload, { abortEarly: false });
      delete payload.confirmPassword;

      const { ...rest } = payload;
      const entry: RegistrationEntry = {
        id: crypto.randomUUID(),
        ...rest,
      };

      dispatch(registrationActions.addEntry(entry));
      onSuccess();
    } catch (err: unknown) {
      setErrors(parseYupErrors(err));
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <NameField error={errors.name} />
        <AgeField error={errors.age} />
        <EmailField error={errors.email} />
        <PasswordField error={errors.password} />
        <ConfirmPasswordField error={errors.confirmPassword} />
        <GenderField error={errors.gender} />
        <CountryField error={errors.country} />
        <PictureField
          error={errors.pictureBase64 || pictureErr}
          onPickFile={handleFileChange}
          hiddenRef={hiddenInputRef}
        />
      </div>
      <TermsCheckbox error={errors.termsAccepted} />

      <button
        className="rounded-xl bg-brand px-4 py-2 text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
