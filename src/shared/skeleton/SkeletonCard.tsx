import { type FC } from 'react';

export const SkeletonCard: FC = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-xs h-[420px] flex flex-col bg-bg-secondary">
      <div className="w-full h-64 animate-pulse flex-shrink-0 bg-border" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="h-6 rounded w-3/4 mb-2 animate-pulse bg-border" />
        <div className="h-4 rounded w-2/3 mb-1 animate-pulse bg-border" />
        <div className="h-4 rounded w-1/3 animate-pulse bg-border]" />
      </div>
    </div>
  );
};
