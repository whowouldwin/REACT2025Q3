import { ChevronDownIcon, ChevronUpIcon } from '@/assets/icons/index.ts';
import type { SortDirection } from '@/entities/yearly-data-table';

type Props = {
  active?: boolean;
  direction?: SortDirection;
  className?: string;
};

export function SortIcon({
  active = false,
  direction = 'asc',
  className,
}: Props) {
  if (!active) {
    return (
      <ChevronDownIcon
        className={`h-4 w-4 opacity-0 group-hover:opacity-50 ${className ?? ''}`}
      />
    );
  }
  return direction === 'desc' ? (
    <ChevronDownIcon className={className} />
  ) : (
    <ChevronUpIcon className={className} />
  );
}

export default SortIcon;
