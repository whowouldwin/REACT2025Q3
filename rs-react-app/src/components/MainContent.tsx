import React from 'react';

import { CrashButton } from './CrashButton';
import { FallbackUI } from './FallbackUI';
import { SearchResults } from './SearchResults';
import { ErrorBoundary } from '../error/ErrorBoundary';

import type { Character } from '../types/rickAndMorty.ts';

interface MainContentProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  lastCount: number;
  page: number;
  totalPages: number;
  crash: boolean;
  onPrev: () => void;
  onNext: () => void;
  onCrash: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  characters,
  loading,
  error,
  lastCount,
  page,
  totalPages,
  crash,
  onPrev,
  onNext,
  onCrash,
}) => {
  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <ErrorBoundary fallback={<FallbackUI />}>
        <SearchResults
          data={characters}
          loading={loading}
          error={error}
          skeletonCount={lastCount}
          page={page}
          totalPages={totalPages}
          onPrev={onPrev}
          onNext={onNext}
          crash={crash}
        />
      </ErrorBoundary>
      <div className="mt-8 flex justify-center">
        <CrashButton onCrash={onCrash} />
      </div>
    </div>
  );
};
