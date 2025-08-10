import { screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

import { createMockStore, renderWithProviders } from './utils/test-utils.tsx';
import { Header } from '../features/site-header/Header.tsx';

describe('Header navigation and search behavior', () => {
  const mockHandleSearch = vi.fn();

  it('renders the search bar only on home page', () => {
    const store = createMockStore();
    renderWithProviders(<Header handleSearch={mockHandleSearch} />, store, [
      '/',
    ]);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('does not render the search bar on other pages', () => {
    const store = createMockStore();
    renderWithProviders(<Header handleSearch={mockHandleSearch} />, store, [
      '/about',
    ]);

    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });
});
