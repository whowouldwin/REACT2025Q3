export type PasswordStrength = { score: number };

export function calcPasswordStrength(password: string): PasswordStrength {
  const rules = [/\d/, /[A-Z]/, /[a-z]/, /[^A-Za-z0-9]/];

  const passedRules = rules.filter((rule) => rule.test(password)).length;

  return { score: passedRules };
}
