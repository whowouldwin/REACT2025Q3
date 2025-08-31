import { useCountries } from '@/entities/countries';
import type { ChangeEvent } from 'react';

export function YearSelection() {
  const { availableYears, selectedYear, setSelectedYear } = useCountries();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') return;
    setSelectedYear(Number(e.target.value));
  };

  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="year-select"
        className="text-sm font-medium text-gray-700"
      >
        Select Year:
      </label>

      <select
        id="year-select"
        value={selectedYear ?? ''}
        onChange={handleChange}
        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
