import type { RegistrationEntry } from './types.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  entries: RegistrationEntry[];
}

const initialState: RegistrationState = {
  entries: [],
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<RegistrationEntry>) {
      state.entries.push(action.payload);
    },
    clearAll(state) {
      state.entries = [];
    },
  },
});

export const registrationReducer = slice.reducer;
export const registrationActions = slice.actions;
