import type { ReactNode } from 'react';

export type CellValue = number | string | null | undefined;

export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: CellValue;
}

export interface CountryData {
  name: string;
  iso_code?: string;
  data: YearlyData[];
}

export type SortField = 'name' | 'population';
export type SortDirection = 'asc' | 'desc';

export interface CountriesContextState {
  countriesData: Record<string, CountryData>;

  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;

  selectedCountry: string | null;
  setSelectedCountry: (v: string | null) => void;

  searchTerm: string;
  setSearchTerm: (v: string) => void;

  selectedRegion: string;
  setSelectedRegion: (v: string) => void;

  sortField: SortField;
  setSortField: (v: SortField) => void;

  sortDirection: SortDirection;
  setSortDirection: (v: SortDirection) => void;

  selectedYear: number | null;
  setSelectedYear: (v: number) => void;
  availableYears: number[];
}

export interface CountriesProviderProps {
  children: ReactNode;
  countriesData: Record<string, CountryData>;
}
