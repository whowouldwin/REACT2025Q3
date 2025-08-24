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
} from '@/features/auth-form/uncontrolled/model/schema.ts';

export function ControlledForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
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

  const onSubmit = handleSubmit(onValid);

  return (
    <form onSubmit={onSubmit} noValidate>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input type="number" {...register('age')} placeholder="Age" />
      {errors.age && <p>{errors.age.message}</p>}

      <input type="email" {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        {...register('confirmPassword')}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label>
        <input type="checkbox" {...register('termsAccepted')} />
        Accept terms
      </label>
      {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="rounded-xl bg-brand px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
