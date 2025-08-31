export function formatColumnName(column: string): string {
  return column
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatCellValue(
  value: number | string | null | undefined,
  column: string
): string {
  if (value == null) {
    return 'N/A';
  }

  if (typeof value === 'number') {
    if (column === 'year') {
      return value.toString();
    }

    if (column.includes('per_capita') || column.includes('percentage')) {
      return formatNumber(value, 2);
    }

    if (Number.isInteger(value)) {
      return value.toLocaleString();
    }

    return formatNumber(value, 2);
  }

  return String(value);
}

function formatNumber(value: number, fractionDigits: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
