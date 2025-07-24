import React from 'react';
import { ResultsList } from './ResultsList.tsx';
import type { Character } from '../api/rickAndMorty.ts';

interface Props {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  crash: boolean;
}

export class SearchResults extends React.Component<Props> {
  render() {
    if (this.props.crash) {
      throw new Error('Render crash!');
    }
    const {
      data,
      loading,
      error,
      skeletonCount,
      page,
      totalPages,
      onPrev,
      onNext,
    } = this.props;

    return (
      <>
        <ResultsList
          data={data}
          loading={loading}
          error={error}
          skeletonCount={skeletonCount}
        />
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={onPrev}
            disabled={page <= 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              page <= 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none'
            }`}
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded-lg font-medium text-white">
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={onNext}
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              page >= totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none'
            }`}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
