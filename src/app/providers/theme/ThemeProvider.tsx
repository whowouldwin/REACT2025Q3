import React, { type FC, useEffect } from 'react';

import { useAppSelector } from '@/state/store/hooks';
import { selectTheme } from '@/state/store/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);
  return <>{children}</>;
};
