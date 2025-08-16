import { type FC } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
// import { ThemeToggle } from '../theme/ThemeToggle';
import { SearchBar } from '../search-bar/SearchBar';
import Link from 'next/link';


// interface HeaderProps {
//   handleSearch: (text: string) => void;
// }

export const Header: FC = () => {
  const location = {
    pathname: '/',
  } ;

  const handleSearch = () => {};
  const isHomePage = location.pathname === '/';

  const linkBase = 'text-lg hover:underline hover:brightness-110';
  const homeLinkClass = twMerge(
    linkBase,
    location.pathname === '/' ? 'text-accent' : 'text-text-secondary'
  );
  const aboutLinkClass = twMerge(
    linkBase,
    location.pathname === '/about' ? 'text-accent' : 'text-text-secondary'
  );

  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 w-full z-50 shadow-lg border-b',
        'bg-bg border-border'
      )}
    >
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className={twMerge('text-3xl font-bold', 'text-accent')}>
            Rick & Morty
          </h1>

          <div className="flex items-center gap-6">
            {/* <ThemeToggle /> */}
            <nav className="flex gap-4">
              <Link href="/" className={homeLinkClass}>
                Home
              </Link>
              <Link href="/about" className={aboutLinkClass}>
                About
              </Link>
            </nav>
          </div>
        </div>

        {isHomePage && <SearchBar />}
      </div>
    </div>
  );
};
