import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { createMockStore, renderWithProviders } from './utils/test-utils';
import { ThemeToggle } from '../features/theme/ThemeToggle';

describe('ThemeToggle', () => {
  it('renders with light mode by default', () => {
    const store = createMockStore();
    renderWithProviders(<ThemeToggle />, store);
    expect(screen.getByText(/light mode/i)).toBeInTheDocument();
  });
});
