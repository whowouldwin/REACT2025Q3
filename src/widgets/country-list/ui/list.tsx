import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { getCountryRegion } from '@/features/region-filter';
import { ChevronRightIcon } from '@/shared/ui/icons';
import { useCountries, getLatestPopulation } from '@/entities/countries';
import { formatNumber } from '@/shared/lib';
import {
  sortYearlyData,
  type SortDirection,
} from '@/entities/yearly-data-table';

export function CountryList() {
  const {
    countriesData,
    selectedCountry,
    setSelectedCountry,
    searchTerm,
    selectedRegion,
    sortField,
    sortDirection,
    selectedYear,
  } = useCountries();
  const processedCountries = useMemo(() => {
    const countriesArray = Object.entries(countriesData).map(
      ([key, country]) => ({
        key,
        ...country,
        region: getCountryRegion(country.name),
        yearPopulation: selectedYear
          ? country.data.find((d) => d.year === selectedYear)?.population
          : undefined,
      })
    );

    type Row = (typeof countriesArray)[number] & {
      computedPopulation?: number;
    };

    const regionFiltered =
      selectedRegion === 'All Regions'
        ? countriesArray
        : countriesArray.filter((country) => country.region === selectedRegion);

    const searchFiltered = searchTerm
      ? regionFiltered.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : regionFiltered;

    const preparedForSort = searchFiltered.map((country) => {
      if (sortField === 'population') {
        return {
          ...country,
          computedPopulation:
            country.yearPopulation ?? getLatestPopulation(country),
        };
      }
      return country;
    });

    const sortByField =
      sortField === 'population' ? 'computedPopulation' : sortField;

    return sortYearlyData<Row>(
      preparedForSort,
      sortByField,
      sortDirection as SortDirection
    );
  }, [
    countriesData,
    searchTerm,
    selectedRegion,
    sortField,
    sortDirection,
    selectedYear,
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-y-auto max-h-[70vh]">
        {processedCountries.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            {searchTerm
              ? 'No countries match your search'
              : 'No countries data available'}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {processedCountries.map((country) => {
              const population =
                country.yearPopulation ?? getLatestPopulation(country);

              const isSelected = selectedCountry === country.key;

              return (
                <li
                  key={country.key}
                  className={twMerge(
                    'cursor-pointer',
                    isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                  )}
                  onClick={() =>
                    setSelectedCountry(isSelected ? null : country.key)
                  }
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={twMerge(
                            'text-base font-medium truncate',
                            isSelected ? 'text-blue-700' : 'text-gray-900'
                          )}
                        >
                          {country.name}
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {country.iso_code && (
                            <span className="mr-3">
                              ISO: {country.iso_code}
                            </span>
                          )}
                          {typeof population === 'number' && (
                            <span>Pop: {formatNumber(population)}</span>
                          )}
                        </div>
                      </div>
                      <div
                        className={twMerge(
                          'ml-2 flex-shrink-0 text-gray-400',
                          isSelected ? 'text-blue-500' : ''
                        )}
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
