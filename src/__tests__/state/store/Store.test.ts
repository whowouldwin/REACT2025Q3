import { expect, beforeEach, describe, it } from 'vitest';

import { toggleItemSelection } from '@/state/store/selectedItemsSlice.ts';
import { makeStore } from '@/state/store/store.ts';

describe('store middleware', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save selectedItems to localStorage on dispatch', () => {
    const store = makeStore();

    const character = {
      id: 123,
      name: 'Morty',
      status: 'Alive',
      species: 1,
      gender: 'Male',
      image: 'https://example.com/morty.jpg',
    };

    store.dispatch(toggleItemSelection(character));

    const stored = localStorage.getItem('selectedItems');
    expect(stored).not.toBeNull();

    if (!stored) {
      throw new Error('Nothing stored');
    }

    const parsed = JSON.parse(stored);
    expect(parsed.selectedIds).toEqual([123]);
    expect(parsed.selectedItems['123'].name).toBe('Morty');
  });
});
