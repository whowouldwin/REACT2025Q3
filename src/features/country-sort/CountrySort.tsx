import { ChevronUpIcon, ChevronDownIcon } from '@/shared/ui/icons';
import { useCountries } from '@/entities/countries';
import type { SortField } from '@/entities/countries/model/types.ts';
import clsx from 'clsx';
import {
  formatColumnName,
  type SortDirection,
} from '@/entities/yearly-data-table';

const SORT_FIELDS: readonly SortField[] = ['name', 'population'] as const;

function isSortField(value: string): value is SortField {
  return (SORT_FIELDS as readonly string[]).includes(value);
}

export function CountrySort() {
  const { sortField, sortDirection, setSortField, setSortDirection } =
    useCountries();

  const onSortChange = (nextField: SortField, nextDirection: SortDirection) => {
    setSortField(nextField);
    setSortDirection(nextDirection);
  };

  return (
    <div className={clsx('flex items-center gap-2')}>
      <label
        htmlFor="sort-select"
        className={clsx('text-sm font-medium text-gray-700')}
      >
        Sort by:
      </label>

      <select
        id="sort-select"
        value={sortField}
        onChange={(e) => {
          const value = e.target.value;
          if (isSortField(value)) {
            onSortChange(value, sortDirection);
          }
        }}
        className={clsx(
          'block w-32 rounded-md border border-gray-300 shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'sm:text-sm'
        )}
        aria-label="Sort field"
      >
        {SORT_FIELDS.map((field) => (
          <option key={field} value={field}>
            {formatColumnName(field)}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() =>
          onSortChange(sortField, sortDirection === 'asc' ? 'desc' : 'asc')
        }
        className={clsx(
          'rounded-md p-1 hover:bg-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        )}
        aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
        title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortDirection === 'asc' ? (
          <ChevronUpIcon className={clsx('h-5 w-5 text-gray-500')} />
        ) : (
          <ChevronDownIcon className={clsx('h-5 w-5 text-gray-500')} />
        )}
      </button>
    </div>
  );
}
