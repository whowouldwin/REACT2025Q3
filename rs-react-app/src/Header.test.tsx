import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';

import { Header } from './components/Header.tsx';
describe('Header navigation and search behavior', () => {
  const mockHandleSearch = vi.fn();

  it('renders the search bar only on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header handleSearch={mockHandleSearch} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('does not render the search bar on other pages', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header handleSearch={mockHandleSearch} />
      </MemoryRouter>
    );

    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });
});
