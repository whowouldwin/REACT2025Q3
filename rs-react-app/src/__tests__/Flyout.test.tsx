import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Flyout } from '../components/Flyout';
import { createMockStore, renderWithProviders } from './utils/test-utils';

import type { Character } from '../types/rickAndMorty';

global.URL.createObjectURL = vi.fn(() => '');

const mockSetAttribute = vi.fn();
const mockClick = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();

  const originalCreateElement = document.createElement;

  vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
    if (tagName === 'a') {
      const anchor = originalCreateElement.call(document, tagName);
      anchor.setAttribute = mockSetAttribute;
      anchor.click = mockClick;
      anchor.style.visibility = 'hidden';
      return anchor;
    }
    return originalCreateElement.call(document, tagName);
  });
});

const createMockCharacter = (id: number): Character => ({
  id,
  name: `Character ${id}`,
  status: 'Alive',
  species: 1,
  image: `https://example.com/${id}.png`,
  gender: 'Male',
});

describe('Flyout', () => {
  it('does not render when no items are selected', () => {
    const store = createMockStore([]);
    renderWithProviders(<Flyout />, store);
    expect(screen.queryByText(/item is selected/i)).not.toBeInTheDocument();
  });

  it('renders flyout with correct count when 3 items are selected', () => {
    const mockCharacters = [
      createMockCharacter(1),
      createMockCharacter(2),
      createMockCharacter(3),
    ];
    const store = createMockStore([1, 2, 3], mockCharacters);
    renderWithProviders(<Flyout />, store);
    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
  });

  it('renders with singular text when one item is selected', () => {
    const mockCharacters = [createMockCharacter(1)];
    const store = createMockStore([1], mockCharacters);
    renderWithProviders(<Flyout />, store);
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });

  it('clears selection when "Unselect all" button is clicked', async () => {
    const mockCharacters = [createMockCharacter(1), createMockCharacter(2)];
    const store = createMockStore([1, 2], mockCharacters);
    renderWithProviders(<Flyout />, store);

    const button = await screen.findByRole('button', { name: /unselect all/i });
    fireEvent.click(button);
    expect(screen.queryByText(/items? are selected/i)).not.toBeInTheDocument();
  });

  it('downloads CSV when "Download" button is clicked', () => {
    const mockCharacters = [createMockCharacter(1), createMockCharacter(2)];
    const store = createMockStore([1, 2], mockCharacters);
    renderWithProviders(<Flyout />, store);

    fireEvent.click(screen.getByText('Download'));
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(mockSetAttribute).toHaveBeenCalledWith('download', '2_items.csv');
    expect(mockClick).toHaveBeenCalled();
  });
});
