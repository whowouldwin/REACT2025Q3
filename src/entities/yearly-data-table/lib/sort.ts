export type SortDirection = 'asc' | 'desc';

type Comparable = string | number | null | undefined;

function compareValues(aValue: Comparable, bValue: Comparable): number {
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

export function sortYearlyData<T>(
  data: T[],
  sortColumn: keyof T,
  sortDirection: SortDirection
): T[] {
  const dir = sortDirection === 'asc' ? 1 : -1;

  return [...data].sort((leftRow, rightRow) => {
    const leftValue = leftRow[sortColumn] as Comparable;
    const rightValue = rightRow[sortColumn] as Comparable;
    return compareValues(leftValue, rightValue) * dir;
  });
}
