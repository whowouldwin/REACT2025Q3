import type { RegistrationEntry } from './types.ts';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  entries: RegistrationEntry[];
  justAddedId?: string;
}

const initialState: RegistrationState = {
  entries: [],
  justAddedId: undefined,
};

export type NewRegistrationEntry = Omit<RegistrationEntry, 'id'>;

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<NewRegistrationEntry>) {
      const id = nanoid();
      state.entries.push({ id, ...action.payload });
      state.justAddedId = id;
    },
    clearJustAdded(state) {
      state.justAddedId = undefined;
    },
    clearAll(state) {
      state.entries = [];
      state.justAddedId = undefined;
    },
  },
});

export const registrationReducer = slice.reducer;
export const registrationActions = slice.actions;
