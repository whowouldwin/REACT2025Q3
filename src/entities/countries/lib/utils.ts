import { type CountryData } from '../model/types';

export function getAvailableYears(
  countriesData: Record<string, CountryData>
): number[] {
  const yearsSet = new Set<number>();

  Object.values(countriesData).forEach((country) => {
    country.data.forEach((yd) => yearsSet.add(yd.year));
  });

  return Array.from(yearsSet).sort((a, b) => b - a);
}

export function getLatestPopulation(country: {
  data: Array<{ year: number; population?: number }>;
}): number | undefined {
  if (!country.data || country.data.length === 0) return undefined;

  const latestWithPopulation = [...country.data]
    .sort((a, b) => b.year - a.year)
    .find((d) => d.population !== undefined);

  return latestWithPopulation?.population;
}
