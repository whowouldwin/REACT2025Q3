import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Flyout } from '../components/Flyout';
import { createMockStore, renderWithProviders } from './utils/test-utils';

global.URL.createObjectURL = vi.fn(() => '');

const mockSetAttribute = vi.fn();
const mockClick = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();

  const originalCreateElement = document.createElement;

  vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
    if (tagName === 'a') {
      const anchor = document.createElement('a');
      anchor.setAttribute = mockSetAttribute;
      anchor.click = mockClick;
      anchor.style.visibility = 'hidden';
      return anchor;
    }
    return originalCreateElement.call(document, tagName);
  });
});

describe('Flyout', () => {
  it('does not render when no items are selected', () => {
    const store = createMockStore([]);
    const getSelectedItems = vi.fn().mockReturnValue([]);

    renderWithProviders(<Flyout getSelectedItems={getSelectedItems} />, store);

    expect(screen.queryByText(/item is selected/i)).not.toBeInTheDocument();
  });

  it('renders flyout with correct count when 3 items are selected', () => {
    const store = createMockStore([1, 2, 3]);
    const getSelectedItems = vi
      .fn()
      .mockReturnValue([{ id: 1 }, { id: 2 }, { id: 3 }]);

    renderWithProviders(<Flyout getSelectedItems={getSelectedItems} />, store);

    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
  });

  it('renders with singular text when one item is selected', () => {
    const store = createMockStore([1]);
    const getSelectedItems = vi.fn().mockReturnValue([{ id: 1 }]);

    renderWithProviders(<Flyout getSelectedItems={getSelectedItems} />, store);

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });
});
