import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { App } from '../App.tsx';
import { createMockStore, renderWithProviders } from './utils/test-utils.tsx';
import * as rickAndMortyApi from '../utils/api/rickAndMorty.ts';
import { __mocks__ } from '../utils/hooks/__mocks__/useLocalStorage.ts';

import type { ApiResponse, Character } from '../utils/types/rickAndMorty.ts';
import { FetchError } from '../features/error-boundary/FetchError.ts';

vi.mock('../hooks/useLocalStorage');
vi.mock('../api/rickAndMorty.ts');

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 1,
    image: 'https://ex.com/rick.png',
    gender: 'Male',
  },
  {
    id: 2,
    name: 'Morty',
    status: 'Alive',
    species: 1,
    image: 'https://ex.com/morty.png',
    gender: 'Male',
  },
];

const mockApiResponse: ApiResponse = {
  info: { pages: 3 },
  results: mockCharacters,
};

describe('App component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(rickAndMortyApi, 'fetchAll').mockResolvedValue(mockApiResponse);
    __mocks__.resetStore();
  });

  it('renders the header and search bar', async () => {
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);
    await waitFor(() => {
      expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });
  });

  it('preloads characters', async () => {
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);

    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('previous', 1);
    });
  });

  it('updates search term and loads characters while search', async () => {
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'morty' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(__mocks__.setValue).toHaveBeenCalledWith('morty');
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('morty', 1);
    });
  });

  it('goes to previous page', async () => {
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);

    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('previous', 1);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('previous', 2);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('previous', 1);
    });
  });

  it('handles FetchError correctly', async () => {
    vi.mocked(rickAndMortyApi.fetchAll).mockRejectedValue(
      new FetchError('Could not fetch character')
    );
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);

    await waitFor(() => {
      expect(screen.getByText('Could not fetch character')).toBeInTheDocument();
    });
  });

  it('handles generic errors', async () => {
    vi.mocked(rickAndMortyApi.fetchAll).mockRejectedValue(
      new Error('Network error-boundary')
    );
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);

    await waitFor(() => {
      expect(
        screen.getByText('Generic error-boundary: Network error-boundary')
      ).toBeInTheDocument();
    });
  });

  it('handles unexpected errors', async () => {
    vi.mocked(rickAndMortyApi.fetchAll).mockRejectedValue(
      'Unexpected error-boundary occurred'
    );
    const store = createMockStore();
    renderWithProviders(<App />, store, ['/']);

    await waitFor(() => {
      expect(
        screen.getByText('Unexpected error-boundary occurred')
      ).toBeInTheDocument();
    });
  });
});
