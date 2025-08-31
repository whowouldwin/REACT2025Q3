import { YearSelection } from '@/features/year-selection';
import { RegionFilter } from '@/features/region-filter';
import { CountrySearch } from '@/features/country-search/CountrySearch.tsx';
import { CountrySort } from '@/features/country-sort/CountrySort.tsx';
import type {
  SortField,
  SortDirection,
} from '@/entities/countries/model/types.ts';
import { useCountries } from '@/entities/countries';

export function FilterControls() {
  const { searchTerm, setSearchTerm } = useCountries();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <YearSelection />

          <RegionFilter />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-grow">
            <CountrySearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <div className="flex-shrink-0">
            <CountrySort />
          </div>
        </div>
      </div>
    </div>
  );
}

export type { SortField, SortDirection };
