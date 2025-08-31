export function getDefaultYear(availableYears: number[]): number {
  if (availableYears.length) {
    return availableYears[0];
  }
  return new Date().getFullYear();
}
