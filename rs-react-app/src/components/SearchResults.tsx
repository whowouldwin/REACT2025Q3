import React from 'react';

import { ResultsList } from './ResultsList.tsx';

import type { Character } from '../types/rickAndMorty.ts';

interface SearchResultsProps {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  crash: boolean;
  detailsOpen?: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  data,
  loading,
  error,
  skeletonCount,
  page,
  totalPages,
  onPrev,
  onNext,
  crash,
  detailsOpen = false,
}) => {
  if (crash) {
    throw new Error('Render crash!');
  }

  return (
    <>
      <ResultsList
        data={data}
        loading={loading}
        error={error}
        skeletonCount={skeletonCount}
        detailsOpen={detailsOpen}
      />
      {!error && data.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={onPrev}
            disabled={page <= 1}
            className="btn btn-primary"
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded-lg font-medium text-white">
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={onNext}
            disabled={page >= totalPages}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};
