import { type ChangeEvent, useCallback } from 'react';
import { REGIONS } from '../constants';
import { useCountries } from '@/entities/countries';

export function RegionFilter() {
  const { selectedRegion, setSelectedRegion } = useCountries();

  const handleRegionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedRegion(e.target.value);
    },
    [setSelectedRegion]
  );

  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="region-select"
        className="text-sm font-medium text-gray-700"
      >
        Filter by Region:
      </label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={handleRegionChange}
        className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
