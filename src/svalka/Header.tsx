import { type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ThemeToggle } from '../features/theme/ThemeToggle.tsx';
import { SearchBar } from '../features/search-character/ui/SearchBar.tsx';

interface HeaderProps {
  handleSearch: (text: string) => void;
}

export const Header: FC<HeaderProps> = ({ handleSearch }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-lg border-b"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1
            className="text-3xl font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            Rick & Morty
          </h1>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <nav className="flex gap-4">
              <Link
                to="/"
                style={{
                  color:
                    location.pathname === '/'
                      ? 'var(--color-accent)'
                      : 'var(--color-text-secondary)',
                }}
                className="text-lg hover:underline hover:brightness-110"
              >
                Home
              </Link>
              <Link
                to="/about"
                style={{
                  color:
                    location.pathname === '/about'
                      ? 'var(---color-accent)'
                      : 'var(--color-text-secondary)',
                }}
                className="text-lg hover:underline hover:brightness-110"
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
