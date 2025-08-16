import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from '../App';
import { ThemeProvider } from './providers/theme/ThemeProvider';
import { store } from '../state/store/store';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
