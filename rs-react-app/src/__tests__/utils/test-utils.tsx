import type { ReactElement } from 'react';

import {
  configureStore,
  type EnhancedStore,
  type Store,
} from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';

import { selectedItemsSlice } from '../../store/selectedItemsSlice.ts';

export const createMockStore = (selectedIds: number[] = []): Store => {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsSlice.reducer,
    },
    preloadedState: {
      selectedItems: {
        selectedIds,
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
      <MemoryRouter initialEntries={routeEntries}>{ui}</MemoryRouter>
    </Provider>,
    { container }
  );
};
