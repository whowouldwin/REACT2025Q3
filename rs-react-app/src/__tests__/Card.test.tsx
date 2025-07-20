import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card.tsx';
import type { Character } from '../api/rickAndMorty.ts';

describe('Card', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 1,
    image: 'https://ex.com/${id}.png',
    gender: 'Male',
  };

  it('displays item name and description correctly', () => {
    render(<Card {...mockCharacter} />);
    const image = screen.getByRole('img', { name: mockCharacter.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCharacter.status} — ${mockCharacter.species}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  });
});
