import React from 'react';

import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-lg border-b border-gray-700">
      <div className="container mx-auto py-4 px-4">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-4">
          Rick & Morty
        </h1>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};
