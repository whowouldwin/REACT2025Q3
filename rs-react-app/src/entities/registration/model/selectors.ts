import type { RootState } from '@/app/store.ts';

export const selectRegistrationEntries = (state: RootState) =>
  state.registration.entries;

export const selectJustAddedId = (state: RootState) =>
  state.registration.justAddedId;
