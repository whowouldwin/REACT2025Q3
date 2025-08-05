import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Flyout } from './Flyout.tsx';
import { Header } from './Header.tsx';

import type { Character } from '../utils/types/rickAndMorty.ts';

interface MainLayoutProps {
  handleSearch: (query: string) => void;
  characters: Character[];
}

export const MainLayout: FC<MainLayoutProps> = ({ handleSearch }) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--text-primary)',
      }}
    >
      <Header handleSearch={handleSearch} />
      <Outlet />
      <Flyout />
    </div>
  );
};
