import { screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest'; // добавь describe

import { ResultsList } from '../svalka/ResultsList.tsx';
import { createMockStore, renderWithProviders } from './utils/test-utils.tsx';

import type { Character } from '../utils/types/rickAndMorty.ts';

const makeCharacter = (id: number): Character => ({
  id,
  name: `Name ${id}`,
  status: 'Alive',
  species: 2,
  image: `https://example.com/${id}.png`,
  gender: 'Male',
});

describe('ResultsList', () => {
  it('renders correct number of items when data is provided', () => {
    const data = [
      {
        id: 1,
        name: 'Rick',
        status: 'Alive',
        species: 2,
        gender: 'Male',
        image: 'https://ex.com/1.png',
      },
      {
        id: 2,
        name: 'Morty',
        status: 'Alive',
        species: 3,
        gender: 'Male',
        image: 'https://ex.com/2.png',
      },
    ];

    const store = createMockStore();
    renderWithProviders(
      <ResultsList
        data={data}
        loading={false}
        error={null}
        skeletonCount={0}
      />,
      store
    );

    expect(screen.getByText(/Rick/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty/i)).toBeInTheDocument();
  });

  it('render cards', () => {
    const data = [makeCharacter(1), makeCharacter(2)];
    const store = createMockStore();
    renderWithProviders(
      <ResultsList
        data={data}
        loading={false}
        error={null}
        skeletonCount={0}
      />,
      store
    );

    data.forEach((item) => {
      expect(screen.getByRole('img', { name: item.name })).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('displays error-boundary message when API call fails', () => {
    const message = 'HTTP status codes (4xx, 5xx)';
    const store = createMockStore();
    renderWithProviders(
      <ResultsList
        data={[]}
        loading={false}
        error={message}
        skeletonCount={3}
      />,
      store
    );
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
