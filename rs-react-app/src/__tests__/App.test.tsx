import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as rickAndMortyApi from '../api/rickAndMorty.ts';
import { App } from '../App.tsx';
import { FetchError } from '../error/FetchError.ts';
import * as localStorageUtils from '../utils/localStorage.ts';

import type { Character, ApiResponse } from '../api/rickAndMorty.ts';

vi.mock('../utils/localStorage');
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

describe('app component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(rickAndMortyApi, 'fetchAll').mockResolvedValue(mockApiResponse);
  });

  it('renders the header and search bar', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Rick & Morty')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });
  });

  it('preloads characters', async () => {
    vi.mocked(localStorageUtils.getSearchText).mockReturnValue('rick');
    render(<App />);
    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('rick', 1);
    });
  });

  it('updates search term and loads characters while search', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'morty' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    await waitFor(() => {
      expect(localStorageUtils.setSearchText).toHaveBeenCalledWith('morty');
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('morty', 1);
    });
  });

  it('goes to previous page', async () => {
    vi.mocked(localStorageUtils.getSearchText).mockReturnValue('rick');
    render(<App />);

    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('rick', 1);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('rick', 2);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Prev' }));
    await waitFor(() => {
      expect(rickAndMortyApi.fetchAll).toHaveBeenCalledWith('rick', 1);
    });
  });

  it('handles FetchError correctly', async () => {
    vi.mocked(rickAndMortyApi.fetchAll).mockRejectedValue(
      new FetchError('Could not fetch character')
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Could not fetch character')).toBeInTheDocument();
    });
  });

  it('handles generic errors', async () => {
    vi.mocked(rickAndMortyApi.fetchAll).mockRejectedValue(
      new Error('Network error')
    );
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText('Generic error: Network error')
      ).toBeInTheDocument();
    });
  });

  it('handles unexpected errors', async () => {
    vi.mocked(rickAndMortyApi.fetchAll).mockRejectedValue(
      'Unexpected error occurred'
    );
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Unexpected error occurred')).toBeInTheDocument();
    });
  });
});
