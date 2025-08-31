import { ColumnItem } from './ColumnItem';
import { REQUIRED_COLUMNS } from '../constants';

interface CategorySectionProps {
  category: string;
  columns: string[];
  selectedColumns: string[];
  onColumnToggle: (column: string) => void;
  onCategoryToggle: (columns: string[]) => void;
}

export function CategorySection({
  category,
  columns,
  selectedColumns,
  onColumnToggle,
  onCategoryToggle,
}: CategorySectionProps) {
  const optionalColumns = columns.filter(
    (col) => !REQUIRED_COLUMNS.includes(col)
  );

  const allSelected = optionalColumns.every((col) =>
    selectedColumns.includes(col)
  );

  const selectedCount = columns.filter((col) =>
    selectedColumns.includes(col)
  ).length;

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 p-3 flex items-center">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() => onCategoryToggle(columns)}
          className="mr-2"
        />

        <div
          className="flex-1 cursor-pointer"
          onClick={() => onCategoryToggle(columns)}
        >
          <h3 className="font-medium text-gray-900">{category}</h3>
        </div>

        <div className="text-xs text-gray-500">
          {selectedCount} of {columns.length} selected
        </div>
      </div>

      <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        {columns.map((column) => (
          <ColumnItem
            key={column}
            column={column}
            isSelected={selectedColumns.includes(column)}
            onToggle={onColumnToggle}
          />
        ))}
      </div>
    </div>
  );
}
