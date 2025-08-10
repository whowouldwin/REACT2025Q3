import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store.ts';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const loadInitialTheme = (): ThemeState => {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return { mode: savedTheme };
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return { mode: 'dark' };
    }
  } catch (error) {
    console.warn('Failed to load theme from localStorage', error);
  }
  return { mode: 'light' };
};

const initialState: ThemeState = loadInitialTheme();

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      try {
        localStorage.setItem('theme', action.payload);
      } catch (error) {
        console.warn('Failed to save theme to localStorage', error);
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', state.mode);
      } catch (error) {
        console.warn('Failed to save theme to localStorage', error);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
