import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Character } from '../../utils/types/rickAndMorty';
import { ResultsList } from '../results-list/ResultsList';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';



interface SearchResultsProps {
  data: Character[];
  error: string | null;
  skeletonCount: number;
  page: number;
  totalPages: number;
  prevHref?: string | null;
  nextHref?: string | null;
  crash: boolean;
  detailsOpen?: boolean;
}

function generateLink(p: number) {
  const param = new URLSearchParams();
  param.set('page', p.toString());
  return `/?${param.toString()}`;
}

export const SearchResults: FC<SearchResultsProps> = ({
  data,
  error,
  skeletonCount,
  page,
  totalPages,
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
          <Link
            href={generateLink(page - 1)}
        
            className={twMerge(
              'btn btn-primary',
              page <= 1 ? 'pointer-events-none' : ''
            )}

            prefetch={false}
          >
            {t('prev')}
          </Link>
          <span
            className={twMerge(
              'px-4 py-2 rounded-lg font-medium',
              'bg-bg-secondary text-text-primary'
            )}
          >
            {t('pageOf', {page, total: totalPages || 1})}
          </span>
          <Link
            href={generateLink(page + 1)}
            className={twMerge(
              'btn btn-primary',
              page >= totalPages ? 'pointer-events-none' : ''
            )}
            prefetch={false}
          >
            {t('next')}
          </Link>
        </div>
      )}
    </>
  );
};
