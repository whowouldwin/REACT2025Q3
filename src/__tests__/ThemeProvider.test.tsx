import { describe, it, expect, beforeEach } from 'vitest';

import { ThemeProvider } from '../state/context/ThemeProvider.tsx';
import { createMockStore, renderWithProviders } from './utils/test-utils.tsx';

describe('ThemeProvider', () => {
  beforeEach(() => {
    const html = document.documentElement;
    html.removeAttribute('data-theme');
    html.classList.remove('dark');
  });

  it('sets data-theme="dark" and adds class "dark" for dark mode', () => {
    const store = createMockStore([], [], 'dark');

    renderWithProviders(
      <ThemeProvider>
        <div>Dark Mode Test</div>
      </ThemeProvider>,
      store
    );

    const html = document.documentElement;
    expect(html.getAttribute('data-theme')).toBe('dark');
    expect(html.classList.contains('dark')).toBe(true);
  });

  it('sets data-theme="light" and removes class "dark" for light mode', () => {
    const store = createMockStore([], [], 'light');

    renderWithProviders(
      <ThemeProvider>
        <div>Light Mode Test</div>
      </ThemeProvider>,
      store
    );

    const html = document.documentElement;
    expect(html.getAttribute('data-theme')).toBe('light');
    expect(html.classList.contains('dark')).toBe(false);
  });
});
