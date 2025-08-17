import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Character } from '../../utils/types/rickAndMorty';
import { ResultsList } from '../results-list/ResultsList';
import { useTranslations } from 'next-intl';


interface SearchResultsProps {
  data: Character[];
  error: string | null;
  skeletonCount: number;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  crash: boolean;
  detailsOpen?: boolean;
}

export const SearchResults: FC<SearchResultsProps> = ({
  data,
  error,
  skeletonCount,
  page,
  totalPages,
  // onPrev,
  // onNext,
  crash,
  detailsOpen = false,
}) => {
  const t = useTranslations('Pagination');
  if (crash) {
    throw new Error('Render crash!');
  }

  return (
    <>
      <ResultsList
        data={data}
        error={error}
        skeletonCount={skeletonCount}
        detailsOpen={detailsOpen}
      />
      {!error && data.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            // onClick={onPrev}
            disabled={page <= 1}
            className="btn btn-primary"
          >
            {t('prev')}
          </button>
          <span
            className={twMerge(
              'px-4 py-2 rounded-lg font-medium',
              'bg-bg-secondary text-text-primary'
            )}
          >
            {t('pageOf', {page, total: totalPages || 1})}
          </span>
          <button
            // onClick={onNext}
            disabled={page >= totalPages}
            className="btn btn-primary"
          >
            {t('next')}
          </button>
        </div>
      )}
    </>
  );
};
