import type { FC } from 'react';

import { MoonIcon, SunIcon } from '@/assets/svg-icons';
import { useAppDispatch, useAppSelector } from '@/state/store/hooks.ts';
import { selectTheme, toggleTheme } from '@/state/store/themeSlice.ts';

export const ThemeToggle: FC = () => {
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
        className="p-2 rounded-full transition-all transform hover:scale-105 active:scale-95 cursor-pointer hover:shadow"
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
