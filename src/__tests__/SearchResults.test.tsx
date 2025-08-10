import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { SearchResults } from '../widgets/search-results/SearchResults.tsx';
import { createMockStore, renderWithProviders } from './utils/test-utils.tsx';

import type { Character } from '../utils/types/rickAndMorty.ts';

describe('search results', () => {
  const mockData: Character[] = [
    {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 2,
      image: 'https://ex.com/${id}.png',
      gender: 'Male',
    },
  ];

  const defaultProps = {
    data: mockData,
    loading: false,
    error: null,
    skeletonCount: 0,
    page: 1,
    totalPages: 5,
    onPrev: vi.fn(),
    onNext: vi.fn(),
    crash: false,
  };

  it('disables previous button on first page', () => {
    const store = createMockStore();
    renderWithProviders(<SearchResults {...defaultProps} page={1} />, store);
    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).toBeDisabled();
  });

  it('enables previous button when not on first page', () => {
    const store = createMockStore();
    renderWithProviders(<SearchResults {...defaultProps} page={2} />, store);
    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    const store = createMockStore();
    renderWithProviders(
      <SearchResults {...defaultProps} page={5} totalPages={5} />,
      store
    );
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('enables next button when not on last page', () => {
    const store = createMockStore();
    renderWithProviders(
      <SearchResults {...defaultProps} page={4} totalPages={5} />,
      store
    );
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).not.toBeDisabled();
  });

  it('throws error-boundary when crash prop is true', () => {
    const store = createMockStore();
    const renderWithCrushed = () =>
      renderWithProviders(
        <SearchResults {...defaultProps} crash={true} />,
        store
      );
    expect(renderWithCrushed).toThrow('Render crash!');
  });
});
