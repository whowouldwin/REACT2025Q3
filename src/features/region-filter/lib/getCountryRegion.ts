import { regionMappings } from './regionMappings';

export function getCountryRegion(countryName: string): string {
  const name = countryName.toLowerCase();

  if (name.includes('world') || name.includes('global')) {
    return 'World';
  }

  if (name.includes('africa')) {
    return 'Africa';
  }
  if (name.includes('asia') || name.includes('middle east')) {
    return 'Asia';
  }
  if (name.includes('europe')) {
    return 'Europe';
  }
  if (
    name.includes('north america') ||
    name.includes('central america') ||
    name.includes('caribbean')
  ) {
    return 'North America';
  }
  if (name.includes('oceania') || name.includes('pacific')) {
    return 'Oceania';
  }
  if (name.includes('south america')) {
    return 'South America';
  }

  for (const [region, countries] of Object.entries(regionMappings)) {
    if (countries.some((country) => name.includes(country))) {
      return region;
    }
  }

  return 'All Regions';
}
