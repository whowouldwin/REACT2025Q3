import type { UseFormRegister } from 'react-hook-form';
import type { FormValues } from '@/features/auth-form/uncontrolled/model/schema';

export type FieldWithRegisterProps = {
  register: UseFormRegister<FormValues>;
  error?: string;
};
