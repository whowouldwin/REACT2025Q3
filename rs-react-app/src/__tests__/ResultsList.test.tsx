import type { Character } from '../api/rickAndMorty.ts';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsList } from '../components/ResultsList.tsx';

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
        image: 'https://ex.com/${id}.png',
      },
      {
        id: 2,
        name: 'Morty',
        status: 'Alive',
        species: 3,
        gender: 'Male',
        image: 'https://ex.com/${id}.png',
      },
    ];
    render(
      <ResultsList data={data} loading={false} error={null} skeletonCount={0} />
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('render cards', () => {
    const data = [makeCharacter(1), makeCharacter(2)];
    render(
      <ResultsList data={data} loading={false} error={null} skeletonCount={0} />
    );

    data.forEach((item) => {
      expect(screen.getByRole('img', { name: item.name })).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', () => {
    const message = 'HTTP status codes (4xx, 5xx)';
    render(
      <ResultsList
        data={[]}
        loading={false}
        error={message}
        skeletonCount={3}
      />
    );
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
