import { useState, useCallback } from 'react';
import type { YearlyData } from '@/entities/countries';
import { TableHeader } from './table-header.tsx';
import { TableRow } from './table-row.tsx';
import { Pagination } from '../pagination.tsx';
import { NoDataRow } from '@/entities/yearly-data-table/ui/table/NoDataRow.tsx';
import { useCountries } from '@/entities/countries';
import {
  type SortDirection,
  sortYearlyData,
} from '@/entities/yearly-data-table';

interface YearlyDataTableProps {
  data?: YearlyData[];
  columns?: string[];
  selectedYear?: number | null;
  pageSize?: number;
}

export function YearlyDataTable({
  data,
  columns,
  selectedYear,
  pageSize = 10,
}: YearlyDataTableProps = {}) {
  const {
    selectedCountry,
    countriesData,
    selectedColumns,
    selectedYear: contextSelectedYear,
  } = useCountries();

  const countryData =
    selectedCountry && countriesData ? countriesData[selectedCountry] : null;
  const tableData = data || (countryData ? countryData.data : []);
  const tableColumns = columns || selectedColumns;
  const tableSelectedYear =
    selectedYear !== undefined ? selectedYear : contextSelectedYear;
  const [sortColumn, setSortColumn] = useState('year');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = sortYearlyData(tableData, sortColumn, sortDirection);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = useCallback(
    (column: string) => {
      if (sortColumn === column) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortColumn(column);
        setSortDirection('desc');
      }
      setCurrentPage(1);
    },
    [sortColumn]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            columns={tableColumns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <NoDataRow colSpan={tableColumns.length} />
            ) : (
              paginatedData.map((yearData) => (
                <TableRow
                  key={yearData.year}
                  yearData={yearData}
                  columns={tableColumns}
                  isSelected={
                    tableSelectedYear !== undefined &&
                    yearData.year === tableSelectedYear
                  }
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={sortedData.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
