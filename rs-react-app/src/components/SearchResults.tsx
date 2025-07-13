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
        <div className="pagination-controls">
          <button onClick={onPrev} disabled={page <= 1}>
            Prev
          </button>
          <span>Page {page}</span>
          <button onClick={onNext} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      </>
    );
  }
}
