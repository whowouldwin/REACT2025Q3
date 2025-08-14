import type { FC } from 'react';

import { twMerge } from 'tailwind-merge';

import { MoonIcon, SunIcon } from '@/assets/svg-icons';
import { useAppDispatch, useAppSelector } from '@/state/store/hooks';
import { selectTheme, toggleTheme } from '@/state/store/themeSlice';

export const ThemeToggle: FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center gap-3">
      <span className={twMerge('text-sm font-medium', 'text-text-primary')}>
        {theme === 'light' ? 'Light' : 'Dark'} Mode
      </span>
      <button
        onClick={handleToggle}
        className={twMerge(
          'p-2 rounded-full transition-all transform',
          'hover:scale-105 active:scale-95 cursor-pointer hover:shadow',
          'bg-bg-secondary text-text-primary'
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};
