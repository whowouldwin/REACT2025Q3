import { twMerge } from 'tailwind-merge';
import { formatColumnName } from '@/entities/yearly-data-table/lib/format';
import { REQUIRED_COLUMNS } from '../constants';

interface ColumnItemProps {
  column: string;
  isSelected: boolean;
  onToggle: (column: string) => void;
}

export function ColumnItem({ column, isSelected, onToggle }: ColumnItemProps) {
  const isRequired = REQUIRED_COLUMNS.includes(column);

  const inputId = `column-${column}`;

  const labelText = formatColumnName(column);

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={inputId}
        checked={isSelected}
        onChange={() => onToggle(column)}
        disabled={isRequired}
        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
      />

      <label
        htmlFor={inputId}
        className={twMerge(
          'ml-2 text-sm truncate',
          isRequired && 'font-medium'
        )}
      >
        {labelText}
        {isRequired && (
          <span className="ml-1 text-xs text-gray-500">(required)</span>
        )}
      </label>
    </div>
  );
}
