import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedIds: number[];
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
  return { selectedIds: [] };
};

const initialState: SelectedItemsState = loadInitialState();

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItemSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);

      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleItemSelection, clearSelection } =
  selectedItemsSlice.actions;

export const selectSelectedIds = (state: {
  selectedItems: SelectedItemsState;
}) => state.selectedItems.selectedIds;

export default selectedItemsSlice.reducer;
