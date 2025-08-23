import type { RegistrationEntry } from '@/entities/registration';

export type FormErrorKey = keyof RegistrationEntry | 'confirmPassword';
export type FormErrors = Partial<Record<FormErrorKey, string>>;
