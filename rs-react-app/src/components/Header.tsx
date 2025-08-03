import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  handleSearch: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ handleSearch }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-lg border-b border-gray-700">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-400"> Rick & Morty </h1>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`text-lg ${location.pathname === '/' ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-white'}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-lg ${location.pathname === '/about' ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-white'}`}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
        {isHomePage && <SearchBar onSearch={handleSearch} />}
      </div>
    </div>
  );
};
