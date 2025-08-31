import { useState } from 'react';
import { co2DataResource } from '@/shared/api/co2Data';
import { FilterControls } from '@/widgets/filter-controls';
import { ColumnSelectionModal } from '@/features/column-selection';
import { YearlyDataTable } from '@/entities/yearly-data-table';
import { CountryList } from '@/widgets/country-list';
import { CountriesProvider, useCountries } from '@/entities/countries';

export function CountriesPage() {
  const co2Data = co2DataResource.read();

  return (
    <CountriesProvider countriesData={co2Data}>
      <CountriesPageContent />
    </CountriesProvider>
  );
}

function CountriesPageContent() {
  const { countriesData, selectedCountry, selectedYear } = useCountries();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const countryData =
    selectedCountry && countriesData ? countriesData[selectedCountry] : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">CO2 Emissions by Country</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          Select Columns
        </button>
      </div>

      <FilterControls />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 lg:w-1/4">
          <CountryList />
        </div>
        <div className="md:w-2/3 lg:w-3/4">
          {selectedCountry && countryData ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{countryData.name}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {countryData.iso_code && (
                    <span className="mr-4">
                      ISO Code: {countryData.iso_code}
                    </span>
                  )}
                  {selectedYear != null && <span>Year: {selectedYear}</span>}
                </div>
              </div>

              <YearlyDataTable />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center h-full flex items-center justify-center">
              <div>
                <p className="text-lg text-gray-600 mb-2">
                  Select a country from the list
                </p>
                <p className="text-sm text-gray-500">
                  The yearly data will be displayed here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ColumnSelectionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
