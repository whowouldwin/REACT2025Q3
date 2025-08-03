import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.tsx';
import { store } from './store/store';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
        basename="/"
      >
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
