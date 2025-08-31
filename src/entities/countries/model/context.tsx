import { createContext } from 'react';
import type { CountriesContextState } from './types';

export const CountriesContext = createContext<
  CountriesContextState | undefined
>(undefined);
