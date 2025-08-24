export const MSG = {
  name_required: 'Name is required',
  name_capital: 'First letter must be capitalized',

  age_required: 'Age is required',
  age_number: 'Age must be a number',
  age_non_negative: 'Age cannot be negative',

  email_required: 'Email is required',
  email_invalid: 'Invalid email address',

  password_required: 'Password is required',
  password_strong: 'Must include: digit, A-Z, a-z, special character',

  confirm_required: 'Confirm password is required',
  confirm_match: 'Passwords must match',

  gender_invalid: 'Invalid gender',

  terms_required: 'You must accept the terms',

  country_required: 'Country is required',
} as const;
