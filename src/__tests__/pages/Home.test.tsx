import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import Home from '@/pages/Home';

import type { Character } from '@/utils/types/rickAndMorty';

const refetchMock = vi.fn();
const useGetCharactersQueryMock = vi.fn();

vi.mock('@/utils/api/rickAndMorty', () => ({
  useGetCharactersQuery: (args: { name: string; page: number }) =>
    useGetCharactersQueryMock(args),
}));

vi.mock('@/widgets/search-results/SearchResults', () => ({
  SearchResults: (p: {
    data: Character[];
    loading: boolean;
    error: string | null;
    skeletonCount: number;
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    crash: boolean;
    detailsOpen?: boolean;
  }) => (
    <div data-testid="SearchResults">
      <div>page:{p.page}</div>
      <div>total:{p.totalPages}</div>
      <div>detailsOpen:{String(p.detailsOpen)}</div>
      <button onClick={p.onPrev}>Prev</button>
      <button onClick={p.onNext}>Next</button>
    </div>
  ),
}));

vi.mock('@/features/character-details/DetailsView', () => ({
  DetailsView: () => <div data-testid="DetailsView">DETAILS</div>,
}));

vi.mock('@/features/error-boundary/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock('@/shared/fallback-ui/FallbackUI', () => ({
  FallbackUI: () => <div>Fallback</div>,
}));

type QueryData = { info: { pages: number }; results: Character[] };

function setQueryState(
  data?: QueryData,
  opts?: { isLoading?: boolean; isFetching?: boolean }
) {
  useGetCharactersQueryMock.mockReturnValue({
    data,
    isLoading: opts?.isLoading ?? false,
    isFetching: opts?.isFetching ?? false,
    refetch: refetchMock,
  });
}

function makeData(pages: number, count = 3): QueryData {
  return {
    info: { pages },
    results: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Char${i + 1}`,
      status: 'unknown',
      species: 'Unknown',
      image: '',
      gender: 'unknown',
    })),
  };
}

function renderHome(url = '/') {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Home', () => {
  it('renders SearchResults with correct page and totalPages', () => {
    setQueryState(makeData(5));
    renderHome('/?page=2');
    expect(screen.getByTestId('SearchResults')).toBeInTheDocument();
    expect(screen.getByText('page:2')).toBeInTheDocument();
    expect(screen.getByText('total:5')).toBeInTheDocument();
  });

  it('calls refetch on Refresh click', () => {
    setQueryState(makeData(5));
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('shows DetailsView when details param exists', () => {
    setQueryState(makeData(5));
    renderHome('/?details=42');
    expect(screen.getByTestId('DetailsView')).toBeInTheDocument();
    expect(screen.getByText('detailsOpen:true')).toBeInTheDocument();
  });

  it('resets page to 1 if greater than totalPages', () => {
    setQueryState(makeData(2));
    renderHome('/?page=999');
    expect(screen.getByText('page:1')).toBeInTheDocument();
  });
});
