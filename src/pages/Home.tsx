import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DetailsView } from '../svalka/DetailsView.tsx';
import { FallbackUI } from '../svalka/FallbackUI.tsx';
import { SearchResults } from '../svalka/SearchResults.tsx';
import { ErrorBoundary } from '../../features/error/ErrorBoundary.tsx';

import type { CharacterData } from '../utils/hooks/useCharacterData.ts';

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
    <div className="container mx-auto pt-40 pb-10 px-4 relative">
      <div className="flex flex-col lg:flex-row gap-6 transition-all duration-300 ease-in-out">
        <div
          className={`transition-all duration-300 ease-in-out ${detailsId ? 'lg:w-2/3' : 'w-full'}`}
        >
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
              detailsOpen={!!detailsId}
            />
          </ErrorBoundary>
        </div>
        {detailsId && (
          <div className="relative lg:w-1/3 transition-all duration-300 ease-in-out ml-4">
            <DetailsView />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
