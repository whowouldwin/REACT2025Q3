import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Card } from './card/Card.tsx';
import { SkeletonCard } from './SkeletonCard.tsx';

import type { Character } from '../utils/types/rickAndMorty.ts';

interface ResultsListProps {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
  detailsOpen?: boolean;
}

export const ResultsList: FC<ResultsListProps> = ({
  data,
  loading,
  error,
  skeletonCount,
  detailsOpen = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('details');
  const renderSkeletonCards = () => (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        detailsOpen
          ? 'lg:grid-cols-3 xl:grid-cols-4'
          : 'lg:grid-cols-4 xl:grid-cols-5'
      } gap-6 justify-items-center`}
    >
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))}
    </div>
  );

  if (loading && data.length === 0) return renderSkeletonCards();
  if (error)
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center mx-auto max-w-2xl">
        <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
        <p className="text-white">{error}</p>
      </div>
    );

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        detailsOpen
          ? 'lg:grid-cols-3 xl:grid-cols-4'
          : 'lg:grid-cols-4 xl:grid-cols-5'
      } gap-6 justify-items-center`}
    >
      {data.map((item) => {
        const isSelected = selectedId === item.id.toString();
        return (
          <div
            key={item.id}
            onClick={() => {
              setSearchParams((prev) => {
                prev.set('details', item.id.toString());
                return prev;
              });
            }}
            className={`cursor-pointer w-full transition-all duration-300 ${
              isSelected
                ? 'ring-4 ring-blue-500 ring-opacity-75 z-10 rounded-xl shadow-lg shadow-blue-500/20'
                : ''
            }`}
          >
            <Card {...item} isSelected={isSelected} />
          </div>
        );
      })}
    </div>
  );
};
