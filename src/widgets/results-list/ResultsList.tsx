import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ResultsListContent } from '@/widgets/results-list/ResultsListContent.tsx';

import type { Character } from '@/utils/types/rickAndMorty.ts';
interface Props {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
  detailsOpen?: boolean;
}

export const ResultsList: React.FC<Props> = ({
  data,
  loading,
  error,
  skeletonCount,
  detailsOpen = false,
}) => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('details');

  return (
    <ResultsListContent
      data={data}
      loading={loading}
      error={error}
      skeletonCount={skeletonCount}
      detailsOpen={detailsOpen}
      selectedId={selectedId}
    />
  );
};
