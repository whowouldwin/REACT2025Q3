import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/features/site-header/Header';
import { Flyout } from '@/widgets/selected-items-flyout/Flyout';

import type { Character } from '@/utils/types/rickAndMorty';

interface MainLayoutProps {
  handleSearch: (query: string) => void;
  characters: Character[];
}

export const MainLayout: FC<MainLayoutProps> = ({ handleSearch }) => {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Header handleSearch={handleSearch} />
      <Outlet />
      <Flyout />
    </div>
  );
};
