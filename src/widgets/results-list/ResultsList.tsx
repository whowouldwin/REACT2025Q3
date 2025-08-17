import React from 'react';


import { ResultsListContent } from '../../widgets/results-list/ResultsListContent';
import { Character } from '../../utils/types/rickAndMorty';



interface Props {
  data: Character[];
  error: string | null;
  skeletonCount: number;
  detailsOpen?: boolean;
}

export const ResultsList: React.FC<Props> = ({
  data,
  error,
  skeletonCount,
  detailsOpen = false,
}) => {
  const searchParams = {details: ''};
  const selectedId = searchParams?.details;

  return (
    <ResultsListContent
      data={data}
      error={error}
      skeletonCount={skeletonCount}
      detailsOpen={detailsOpen}
      selectedId={selectedId || ''}
    />
  );
};
