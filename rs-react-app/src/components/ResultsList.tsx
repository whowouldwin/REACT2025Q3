import React from 'react';

import { Card } from './Card.tsx';
import { SkeletonCard } from './SkeletonCard.tsx';

import type { Character } from '../types/rickAndMorty.ts';

interface ResultsListProps {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  data,
  loading,
  error,
  skeletonCount,
}) => {
  const renderSkeletonCards = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      </div>
    );
  };
  if (loading && data.length === 0) return renderSkeletonCards();
  if (error)
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center mx-auto max-w-2xl">
        <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
        <p className="text-white">{error}</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};
