export function validateYear(
  selectedYear: number | null,
  availableYears: number[]
): number | null {
  if (!availableYears.length) return null;
  if (selectedYear === null || !availableYears.includes(selectedYear)) {
    return availableYears[0];
  }
  return selectedYear;
}
