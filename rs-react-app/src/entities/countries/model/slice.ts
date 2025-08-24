import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES, type CountryName } from '@/shared/constants/countries.ts';

interface CountryState {
  all: CountryName[];
}

const initialState: CountryState = {
  all: COUNTRIES,
};

const slice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const countriesReducer = slice.reducer;
