import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { MainLayout } from '@/app/layouts/main/MainLayout';

vi.mock('@/features/site-header/Header', () => ({
  Header: (props: { handleSearch: (q: string) => void }) => (
    <div data-testid="header" onClick={() => props.handleSearch('test')}>
      Header
    </div>
  ),
}));

vi.mock('@/widgets/selected-items-flyout/Flyout', () => ({
  Flyout: () => <div data-testid="flyout">Flyout</div>,
}));

describe('MainLayout', () => {
  it('renders Header and Flyout', () => {
    const handleSearch = vi.fn();
    render(
      <MemoryRouter>
        <MainLayout handleSearch={handleSearch} characters={[]} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });

  it('calls handleSearch from Header', () => {
    const handleSearch = vi.fn();
    render(
      <MemoryRouter>
        <MainLayout handleSearch={handleSearch} characters={[]} />
      </MemoryRouter>
    );
    screen.getByTestId('header').click();
    expect(handleSearch).toHaveBeenCalledWith('test');
  });
});
