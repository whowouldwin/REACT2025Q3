import type { FieldWithRegisterProps } from '../../model/types';

export function TermsField({ register, error }: FieldWithRegisterProps) {
  return (
    <div className="md:col-span-2">
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="h-5 w-5 rounded-md border-gray-300 text-brand focus:ring-2 focus:ring-brand/40"
          {...register('termsAccepted')}
        />
        <span>I accept the terms</span>
      </label>
      <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">
        {error ?? ''}
      </div>
    </div>
  );
}
