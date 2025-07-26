import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CrashButton } from '../components/CrashButton';
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
      setSearchParams({ page: page.toString() });
    }
  }, [page, currentPage, setSearchParams]);

  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
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
      <div className="mt-8 flex justify-center">
        <CrashButton onCrash={characterData.triggerCrash} />
      </div>
    </div>
  );
};

export default Home;
