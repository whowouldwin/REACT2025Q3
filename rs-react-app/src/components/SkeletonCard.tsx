import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg w-full max-w-xs">
      <div className="w-full h-64 bg-gray-700 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
};
