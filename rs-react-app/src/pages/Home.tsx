import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DetailsView } from '../components/DetailsView';
import { FallbackUI } from '../components/FallbackUI';
import { SearchResults } from '../components/SearchResults';
import { ErrorBoundary } from '../error/ErrorBoundary';

import type { CharacterData } from '../hooks/useCharacterData.ts';

interface HomeProps {
  characterData: CharacterData;
}

export const Home: React.FC<HomeProps> = ({ characterData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { page } = characterData;

  useEffect(() => {
    if (page > 0 && page !== currentPage) {
      setSearchParams((prev) => {
        prev.set('page', page.toString());
        return prev;
      });
    }
  }, [page, currentPage, setSearchParams]);

  const detailsId = searchParams.get('details');

  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <div className={`flex-1 ${detailsId ? 'lg:w-3/5' : 'w-full'}`}>
          <ErrorBoundary fallback={<FallbackUI />}>
            <SearchResults
              data={characterData.characters}
              loading={characterData.loading}
              error={characterData.error}
              skeletonCount={characterData.lastCount}
              page={characterData.page}
              totalPages={characterData.totalPages}
              onPrev={characterData.handlePrev}
              onNext={characterData.handleNext}
              crash={characterData.crash}
            />
          </ErrorBoundary>
        </div>

        {detailsId && (
          <div className="lg:w-2/5 fixed lg:relative top-0 right-0 bottom-0 lg:top-auto lg:right-auto lg:bottom-auto z-10 w-full lg:w-auto">
            <DetailsView />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
