export { CountriesProvider } from './model/provider';
export { useCountries } from './model/use-countries';

export { getAvailableYears, getLatestPopulation } from './lib/utils';
export { getAvailableColumns } from './lib/columns';
export { getDefaultYear } from './lib/get-default-year';
export { validateYear } from './lib/validate-year';

export type {
  CountriesContextState,
  CountriesProviderProps,
  YearlyData,
  CountryData,
} from './model/types';
