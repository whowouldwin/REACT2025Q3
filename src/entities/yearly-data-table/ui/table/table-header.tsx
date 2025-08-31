import {
  formatColumnName,
  type SortDirection,
} from '@/entities/yearly-data-table';
import SortIcon from '@/assets/icons/SortIcon.tsx';

interface TableHeaderProps {
  columns: string[];
  sortColumn: string;
  sortDirection: SortDirection;
  onSort: (column: string) => void;
}

export function TableHeader({
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => {
          const isSorted = sortColumn === column;

          return (
            <th
              key={column}
              scope="col"
              className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort(column)}
            >
              <div className="flex items-center">
                <span>{formatColumnName(column)}</span>
                <span className="ml-2 flex-none rounded text-gray-400">
                  <SortIcon active={isSorted} direction={sortDirection} />
                </span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
