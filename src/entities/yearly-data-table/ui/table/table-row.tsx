import { twMerge } from 'tailwind-merge';
import { formatCellValue } from '../../lib/format.ts';
import type { YearlyData } from '@/entities/countries';

interface TableRowProps {
  yearData: YearlyData;
  columns: string[];
  isSelected?: boolean;
}

export function TableRow({
  yearData,
  columns,
  isSelected = false,
}: TableRowProps) {
  return (
    <tr className={twMerge('hover:bg-gray-50', isSelected && 'bg-blue-50')}>
      {columns.map((column) => (
        <td
          key={`${yearData.year}-${column}`}
          className={twMerge(
            'px-6 py-4 whitespace-nowrap text-sm',
            column === 'year' ? 'font-medium text-gray-900' : 'text-gray-500',
            isSelected && 'font-medium'
          )}
        >
          {formatCellValue(yearData[column], column)}
        </td>
      ))}
    </tr>
  );
}
