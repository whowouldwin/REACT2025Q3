import { ValidationError } from 'yup';
import type { FormErrors } from './errorTypes';

export function parseYupErrors(error: unknown): FormErrors {
  if (!(error instanceof ValidationError)) {
    return {};
  }
  const formErrors: Record<string, string> = Object.create(null);
  if (Array.isArray(error.inner)) {
    for (const fieldError of error.inner) {
      if (fieldError.path && !(fieldError.path in formErrors)) {
        formErrors[fieldError.path] = fieldError.message;
      }
    }
  }
  if (error.path && !(error.path in formErrors)) {
    formErrors[error.path] = error.message;
  }
  return formErrors;
}
