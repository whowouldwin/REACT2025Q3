import React from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme, selectTheme } from '../store/themeSlice';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export const ThemeToggle: React.FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-sm font-medium"
        style={{ color: 'var(--text-primary)' }}
      >
        {theme === 'light' ? 'Light' : 'Dark'} Mode
      </span>
      <button
        onClick={handleToggle}
        className="p-2 rounded-full transition hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
        }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};
