import { configureStore, type Middleware } from '@reduxjs/toolkit';

import selectedItemsReducer from './selectedItemsSlice';

const localStorageMiddleware: Middleware =
  (storeAPI) => (next) => (action: unknown) => {
    const result = next(action);

    if (
      typeof action === 'object' &&
      action !== null &&
      'type' in action &&
      typeof action.type === 'string'
    ) {
      try {
        const state = storeAPI.getState();
        localStorage.setItem(
          'selectedItems',
          JSON.stringify(state.selectedItems)
        );
      } catch (error) {
        console.warn('Failed to save to localStorage', error);
      }
    }

    return result;
  };

export const makeStore = () =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
