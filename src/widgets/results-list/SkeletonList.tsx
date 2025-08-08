import React from 'react';

import { SkeletonCard } from '@/svalka/SkeletonCard.tsx';
import { getGridClass } from '@/widgets/results-list/getGridClass.ts';

interface Props {
  count: number;
  detailsOpen: boolean;
}

export const SkeletonList: React.FC<Props> = ({ count, detailsOpen }) => (
  <div className={getGridClass(detailsOpen)}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={`skeleton-${i}`} />
    ))}
  </div>
);
