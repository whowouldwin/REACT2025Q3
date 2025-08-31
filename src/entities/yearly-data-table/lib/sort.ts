export type SortDirection = 'asc' | 'desc';
export type CellValue = number | string | null | undefined;
export type Row = Record<string, CellValue>;

function compareValues(aValue: CellValue, bValue: CellValue): number {
  if (aValue == null && bValue == null) return 0;

  if (aValue == null) return 1;
  if (bValue == null) return -1;

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return aValue - bValue;
  }

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return aValue.localeCompare(bValue);
  }

  return String(aValue).localeCompare(String(bValue));
}

export function sortYearlyData<T extends Row>(
  data: T[],
  sortColumn: string,
  sortDirection: SortDirection
): T[] {
  const directionMultiplier = sortDirection === 'asc' ? 1 : -1;

  return [...data].sort((leftRow, rightRow) => {
    const leftValue = leftRow[sortColumn];
    const rightValue = rightRow[sortColumn];

    const result = compareValues(leftValue, rightValue);
    return result * directionMultiplier;
  });
}
