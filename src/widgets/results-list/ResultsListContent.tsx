import React from 'react';

import { SkeletonList } from '@/shared/skeleton/SkeletonList.tsx';
import { ErrorMessage } from '@/widgets/results-list/ErrorMessage.tsx';
import { getGridClass } from '@/widgets/results-list/getGridClass.ts';
import { ResultsCard } from '@/widgets/results-list/ResultsCard.tsx';

import type { Character } from '@/utils/types/rickAndMorty.ts';

interface Props {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
  detailsOpen: boolean;
  selectedId: string | null;
}

export const ResultsListContent: React.FC<Props> = ({
  data,
  loading,
  error,
  skeletonCount,
  detailsOpen,
  selectedId,
}) => {
  if (loading && data.length === 0)
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
