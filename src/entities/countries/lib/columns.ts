import type { CountryData } from '../model/types';

export function getAvailableColumns(
  data: Record<string, CountryData>
): string[] {
  const columns = new Set<string>();

  columns.add('year');
  columns.add('population');
  columns.add('co2');
  columns.add('co2_per_capita');

  for (const country of Object.values(data)) {
    if (country.data && country.data.length > 0) {
      for (const yearData of country.data) {
        for (const key of Object.keys(yearData)) {
          columns.add(key);
        }
      }
    }
  }

  return Array.from(columns);
}
