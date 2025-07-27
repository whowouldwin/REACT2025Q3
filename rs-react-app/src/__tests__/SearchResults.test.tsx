import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { SearchResults } from '../components/SearchResults.tsx';

import type { Character } from '../types/rickAndMorty.ts';

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
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} page={1} />
      </MemoryRouter>
    );
    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).toBeDisabled();
  });

  it('enables previous button when not on first page', () => {
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} page={2} />
      </MemoryRouter>
    );
    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} page={5} totalPages={5} />
      </MemoryRouter>
    );
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('enables next button when not on last page', () => {
    render(
      <MemoryRouter>
        <SearchResults {...defaultProps} page={4} totalPages={5} />
      </MemoryRouter>
    );
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).not.toBeDisabled();
  });

  it('throws error when crash prop is true', () => {
    const renderWithCrushed = () =>
      render(
        <MemoryRouter>
          <SearchResults {...defaultProps} crash={true} />
        </MemoryRouter>
      );
    expect(renderWithCrushed).toThrow('Render crash!');
  });
});
