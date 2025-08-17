import React from 'react';

import { ErrorMessage } from './ErrorMessage';
import { getGridClass } from './getGridClass';
import { ResultsCard } from './ResultsCard';
import { SkeletonList } from '../../shared/skeleton/SkeletonList';
import { Character } from '../../utils/types/rickAndMorty';

interface Props {
  data: Character[];
  error: string | null;
  skeletonCount: number;
  detailsOpen: boolean;
  selectedId: string | null;
}

export const ResultsListContent: React.FC<Props> = ({
  data,
  error,
  skeletonCount,
  detailsOpen,
  selectedId,
}) => {
  if (data.length === 0)
    return <SkeletonList count={skeletonCount} detailsOpen={detailsOpen} />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={getGridClass(detailsOpen)}>
      {data.map((item) => (
        <ResultsCard
          key={item.id}
          character={item}
          isSelected={selectedId === item.id.toString()}
        />
      ))}
    </div>
  );
};
