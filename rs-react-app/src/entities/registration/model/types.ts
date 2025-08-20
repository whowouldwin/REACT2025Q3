export type Gender = 'male' | 'female' | 'other';

export type FormSource = 'uncontrolled' | 'rhf';

export interface RegistrationEntry {
  name: string;
  gender: Gender;
  email: string;
  password: string;
  age: number;
  country: string;
  termsAccepted: boolean;
  pictureBase64?: string;
  source: FormSource;
}
