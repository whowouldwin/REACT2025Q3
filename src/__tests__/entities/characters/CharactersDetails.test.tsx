import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CharacterDetails } from '@/entities/character/CharacterDetails.tsx';

import type { Character } from '@/utils/types/rickAndMorty.ts';

const makeCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://example.com/rick.png',
  ...overrides,
});

describe('CharacterDetails', () => {
  it('renders name, image, status and species', () => {
    const character = makeCharacter();
    render(<CharacterDetails character={character} />);

    expect(
      screen.getByRole('heading', { name: character.name })
    ).toBeInTheDocument();
    const img = screen.getByAltText<HTMLImageElement>('Rick Sanchez');
    expect(img.src).toBe('https://example.com/rick.png');
    expect(screen.getByText(character.status)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
  });

  it.each([
    ['Alive', 'text-green-400'],
    ['Dead', 'text-red-400'],
    ['unknown', 'text-yellow-400'],
  ])('applies status color for %s', (status, expectedClass) => {
    const character = makeCharacter({ status });
    render(<CharacterDetails character={character} />);
    const statusEl = screen.getByText(status);
    expect(statusEl.className).toContain(expectedClass);
  });
});
