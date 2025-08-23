export function TermsCheckbox({ error }: { error?: string }) {
  return (
    <div className="mb-3">
      <label className="inline-flex items-center gap-2">
        <input name="termsAccepted" type="checkbox" />
        <span>I accept the terms</span>
      </label>
      <div className="text-red-600 text-sm min-h-[1.25rem]">{error ?? ''}</div>
    </div>
  );
}
