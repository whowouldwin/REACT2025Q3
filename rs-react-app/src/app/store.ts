import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from '@/entities/registration';
import { countriesReducer } from '@/entities/countries/model/slice.ts';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
