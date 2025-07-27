import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

interface MainLayoutProps {
  handleSearch: (query: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ handleSearch }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header handleSearch={handleSearch} />
      <Outlet />
    </div>
  );
};
