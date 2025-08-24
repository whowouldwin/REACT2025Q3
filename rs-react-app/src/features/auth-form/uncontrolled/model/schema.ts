import * as yup from 'yup';
import { isStrongPassword } from '@/shared/lib/password/passwordStrength.ts';
import { MSG } from './msg.ts';
import { startsWithCapital } from './rules.ts';
import { genderOptions } from '@/features/auth-form/uncontrolled/model/constants.ts';
import type { Gender } from '@/entities/registration';

export const uncontrolledSchema = yup.object({
  name: yup
    .string()
    .required(MSG.name_required)
    .matches(startsWithCapital, MSG.name_capital),

  age: yup
    .number()
    .typeError(MSG.age_number)
    .min(0, MSG.age_non_negative)
    .required(MSG.age_required),

  email: yup.string().email(MSG.email_invalid).required(MSG.email_required),

  password: yup
    .string()
    .required(MSG.password_required)
    .test('strong-password', MSG.password_strong, isStrongPassword),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], MSG.confirm_match)
    .required(MSG.confirm_required),

  gender: yup
    .mixed<Gender>()
    .oneOf(genderOptions, MSG.gender_invalid)
    .required(MSG.gender_invalid)
    .defined(),

  termsAccepted: yup
    .boolean()
    .oneOf([true], MSG.terms_required)
    .required(MSG.terms_required)
    .defined(),

  pictureBase64: yup.string().nullable().defined(),

  country: yup.string().required(MSG.country_required),
});
export type FormValues = yup.InferType<typeof uncontrolledSchema>;
