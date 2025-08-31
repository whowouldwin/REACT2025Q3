import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import { SearchIcon, ClearIcon } from 'assets/icons';
import { useCountries } from '@/entities/countries';

interface CountrySearchProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export function CountrySearch({
  searchTerm: externalSearch,
  onSearchChange: externalOnChange,
}: CountrySearchProps) {
  const { searchTerm: contextSearch, setSearchTerm } = useCountries();

  const searchTerm = externalSearch ?? contextSearch;
  const handleChange = externalOnChange ?? setSearchTerm;

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        placeholder="Search countries..."
        className={clsx(
          'w-full pl-9 pr-3 py-2 border rounded-md text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        )}
      />

      <div
        className={clsx(
          'absolute inset-y-0 left-0 pl-3 flex items-center',
          'pointer-events-none'
        )}
      >
        <SearchIcon />
      </div>

      {searchTerm && (
        <button
          type="button"
          onClick={() => handleChange('')}
          className={clsx('absolute inset-y-0 right-0 pr-3 flex items-center')}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
}
