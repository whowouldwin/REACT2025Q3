import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToPage = (page: number) => {
    const safePage = Math.min(Math.max(1, page), totalPages);
    onPageChange(safePage);
  };

  const baseBtn = 'rounded-md border px-3 py-2 text-sm transition-colors';
  const disabledBtn = 'cursor-not-allowed opacity-50';
  const activeBtn = 'hover:bg-gray-50';

  return (
    <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={isFirstPage}
          className={clsx(baseBtn, isFirstPage ? disabledBtn : activeBtn)}
        >
          Prev
        </button>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLastPage}
          className={clsx(baseBtn, isLastPage ? disabledBtn : activeBtn)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
