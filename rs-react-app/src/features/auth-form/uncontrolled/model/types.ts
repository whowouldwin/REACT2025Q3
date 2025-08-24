import type { InferType } from 'yup';
import { uncontrolledSchema } from './schema.ts';

export type AuthFormValues = InferType<typeof uncontrolledSchema>;
