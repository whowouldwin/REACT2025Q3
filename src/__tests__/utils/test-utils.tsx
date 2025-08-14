import type { ReactElement } from 'react';

import {
  configureStore,
  type EnhancedStore,
  type Store,
} from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';

import { selectedItemsSlice } from '@/state/store/selectedItemsSlice';
import { themeSlice } from '@/state/store/themeSlice';

import type { Character } from '@/utils/types/rickAndMorty';

export const createMockStore = (
  selectedIds: number[] = [],
  selectedItems: Character[] = [],
  themeMode: 'light' | 'dark' = 'light'
): Store => {
  const selectedItemsMap: Record<number, Character> = {};
  selectedItems.forEach((item) => {
    selectedItemsMap[item.id] = item;
  });

  return configureStore({
    reducer: {
      selectedItems: selectedItemsSlice.reducer,
      theme: themeSlice.reducer,
    },
    preloadedState: {
      selectedItems: {
        selectedIds,
        selectedItems: selectedItemsMap,
      },
      theme: {
        mode: themeMode,
      },
    },
  });
};

export const renderWithProviders = (
  ui: ReactElement,
  store: EnhancedStore,
  routeEntries: MemoryRouterProps['initialEntries'] = ['/']
) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={routeEntries}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {ui}
      </MemoryRouter>
    </Provider>,
    { container }
  );
};
