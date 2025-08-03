import React from 'react';
import { Outlet } from 'react-router-dom';

import { Flyout } from './Flyout';
import { Header } from './Header';

import type { Character } from '../types/rickAndMorty';

interface MainLayoutProps {
  handleSearch: (query: string) => void;
  characters: Character[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({ handleSearch }) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <Header handleSearch={handleSearch} />
      <Outlet />
      <Flyout />
    </div>
  );
};
