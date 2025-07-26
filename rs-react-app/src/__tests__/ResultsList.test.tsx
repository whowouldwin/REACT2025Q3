import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { ResultsList } from '../components/ResultsList.tsx';

import type { Character } from '../types/rickAndMorty.ts';
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

    render(
      <MemoryRouter>
        <ResultsList
          data={data}
          loading={false}
          error={null}
          skeletonCount={0}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty/i)).toBeInTheDocument();
  });

  it('render cards', () => {
    const data = [makeCharacter(1), makeCharacter(2)];
    render(
      <MemoryRouter>
        <ResultsList
          data={data}
          loading={false}
          error={null}
          skeletonCount={0}
        />
      </MemoryRouter>
    );

    data.forEach((item) => {
      expect(screen.getByRole('img', { name: item.name })).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', () => {
    const message = 'HTTP status codes (4xx, 5xx)';
    render(
      <MemoryRouter>
        <ResultsList
          data={[]}
          loading={false}
          error={message}
          skeletonCount={3}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
