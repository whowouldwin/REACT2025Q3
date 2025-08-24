import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import {
  registrationActions,
  type RegistrationEntry,
} from '@/entities/registration';
import type { AppDispatch } from '@/app/store';
import {
  type FormValues,
  uncontrolledSchema,
} from '@/features/auth-form/uncontrolled/model/schema';
import { type ChangeEventHandler, useState } from 'react';
import {
  AgeField,
  ConfirmPasswordField,
  CountryField,
  EmailField,
  GenderField,
  NameField,
  PasswordField,
  PictureField,
  TermsField,
} from '@/features/auth-form/react-hook-form/components/fields';
import { validateAndConvertImage } from '@/shared/lib/imageToBase/validateAndConvertImage.ts';

export function ControlledForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const [localPicErr, setLocalPicErr] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(uncontrolledSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'other',
      termsAccepted: false,
      pictureBase64: null,
      country: '',
    },
  });

  const handlePictureChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    setLocalPicErr(undefined);

    const selectedFile = event.target.files?.[0];
    const { base64: pictureBase64, error: validationError } =
      await validateAndConvertImage(selectedFile, { maxSizeMB: 2 });

    if (validationError) {
      setLocalPicErr(validationError);
    }

    setValue('pictureBase64', pictureBase64 ?? null, { shouldValidate: true });
  };

  const onValid = (data: FormValues) => {
    const payload: RegistrationEntry = {
      name: data.name,
      gender: data.gender,
      email: data.email,
      password: data.password,
      age: data.age,
      country: data.country,
      termsAccepted: data.termsAccepted,
      pictureBase64: data.pictureBase64 ?? undefined,
      source: 'rhf',
    };
    dispatch(registrationActions.addEntry(payload));
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <NameField register={register} error={errors.name?.message} />
        <AgeField register={register} error={errors.age?.message} />
        <EmailField register={register} error={errors.email?.message} />
        <CountryField register={register} error={errors.country?.message} />
        <PasswordField register={register} error={errors.password?.message} />
        <ConfirmPasswordField
          register={register}
          error={errors.confirmPassword?.message}
        />
        <GenderField register={register} error={errors.gender?.message} />
        <PictureField
          register={register}
          error={errors.pictureBase64?.message}
          extraError={localPicErr}
          onChange={handlePictureChange}
        />
        <TermsField register={register} error={errors.termsAccepted?.message} />
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-6 rounded-xl bg-brand px-4 py-3 text-white font-medium
                   shadow-md hover:bg-brand/90 focus:ring-2 focus:ring-brand/50
                   focus:outline-none transition disabled:opacity-60"
      >
        Submit
      </button>
    </form>
  );
}
