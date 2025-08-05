import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Card } from './Card.tsx';
import {
  createMockStore,
  renderWithProviders,
} from '../../__tests__/utils/test-utils.tsx';

import type { Character } from '@/utils/types/rickAndMorty.ts';

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
    const store = createMockStore();
    renderWithProviders(<Card {...mockCharacter} />, store);

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
