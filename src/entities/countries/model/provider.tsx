import { useMemo, useState, useEffect, type PropsWithChildren } from 'react';
import { CountriesContext } from './context';
import { REGIONS } from '@/features/region-filter/constants';
import { REQUIRED_COLUMNS } from '@/features/column-selection/constants';
import { getAvailableYears } from '../lib/utils';
import type { CountriesProviderProps, SortDirection, SortField } from './types';
import { validateYear } from '@/entities/countries/lib/validate-year.ts';
import { getDefaultYear } from '@/entities/countries/lib/get-default-year.ts';

export function CountriesProvider({
  children,
  countriesData,
}: PropsWithChildren<CountriesProviderProps>) {
  const availableYears = useMemo(
    () => getAvailableYears(countriesData),
    [countriesData]
  );

  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(REQUIRED_COLUMNS);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>(REGIONS[0]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [selectedYear, setSelectedYear] = useState<number | null>(() =>
    getDefaultYear(availableYears)
  );

  useEffect(() => {
    setSelectedYear(validateYear(selectedYear, availableYears));
  }, [availableYears, selectedYear]);

  const value = useMemo(
    () => ({
      countriesData,
      selectedColumns,
      setSelectedColumns,
      selectedCountry,
      setSelectedCountry,
      searchTerm,
      setSearchTerm,
      selectedRegion,
      setSelectedRegion,
      sortField,
      setSortField,
      sortDirection,
      setSortDirection,
      selectedYear,
      setSelectedYear,
      availableYears,
    }),
    [
      countriesData,
      selectedColumns,
      selectedCountry,
      searchTerm,
      selectedRegion,
      sortField,
      sortDirection,
      selectedYear,
      availableYears,
    ]
  );

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
}
