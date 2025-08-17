import React from 'react';

import { SkeletonCard } from './SkeletonCard';
import { getGridClass } from '../../widgets/results-list/getGridClass';

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
