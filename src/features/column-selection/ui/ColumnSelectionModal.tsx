import { useState } from 'react';
import { useCountries, getAvailableColumns } from '@/entities/countries';
import { REQUIRED_COLUMNS } from '../constants';

interface ColumnSelectionModalProps {
  onClose: () => void;
}

export function ColumnSelectionModal({ onClose }: ColumnSelectionModalProps) {
  const { countriesData, selectedColumns, setSelectedColumns } = useCountries();

  const allColumns = getAvailableColumns(countriesData);

  const [localSelected, setLocalSelected] = useState<string[]>(selectedColumns);

  const toggleColumn = (column: string) => {
    const isRequired = REQUIRED_COLUMNS.includes(column);

    setLocalSelected((prev) => {
      const alreadySelected = prev.includes(column);

      if (alreadySelected) {
        return isRequired ? prev : prev.filter((c) => c !== column);
      }
      return [...prev, column];
    });
  };

  const apply = () => {
    setSelectedColumns(localSelected);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded p-4 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Select Columns</h2>

        <div className="max-h-[50vh] overflow-y-auto space-y-2">
          {allColumns.map((column) => {
            const isRequired = REQUIRED_COLUMNS.includes(column);
            const isChecked = localSelected.includes(column);

            return (
              <label key={column} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleColumn(column)}
                  disabled={isRequired}
                />
                <span>
                  {column}
                  {isRequired && (
                    <span className="text-xs text-gray-500 ml-1">
                      (required)
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={apply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
