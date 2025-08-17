import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from './store';
import type { Character } from '@/utils/types/rickAndMorty';

interface SelectedItemsState {
  selectedIds: number[];
  selectedItems: Record<number, Character>;
}

const loadInitialState = (): SelectedItemsState => {
  try {
    const savedState = localStorage.getItem('selectedItems');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.warn('Failed to load state from localStorage', error);
  }
  return { selectedIds: [], selectedItems: {} };
};

const initialState: SelectedItemsState = loadInitialState();

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItemSelection: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const id = character.id;
      const index = state.selectedIds.indexOf(id);

      if (index === -1) {
        state.selectedIds.push(id);
        state.selectedItems[id] = character;
      } else {
        state.selectedIds.splice(index, 1);
        state.selectedItems = Object.fromEntries(
          Object.entries(state.selectedItems).filter(
            ([key]) => Number(key) !== id
          )
        );
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
      state.selectedItems = {};
    },
  },
});

export const { toggleItemSelection, clearSelection } =
  selectedItemsSlice.actions;

export const selectSelectedIds = (state: RootState) =>
  state.selectedItems.selectedIds;

export const selectSelectedItemsMap = (state: RootState) =>
  state.selectedItems.selectedItems;

export const selectSelectedItems = createSelector(
  [selectSelectedIds, selectSelectedItemsMap],
  (ids, itemsMap) => ids.map((id) => itemsMap[id])
);

export default selectedItemsSlice.reducer;
