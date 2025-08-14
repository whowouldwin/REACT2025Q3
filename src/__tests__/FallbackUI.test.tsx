import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FallbackUI } from '../shared/fallback-ui/FallbackUI';

describe('FallbackUI', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        reload: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders the fallback message correctly', () => {
    render(<FallbackUI />);
    expect(
      screen.getByRole('heading', { name: 'Something went wrong.' })
    ).toBeInTheDocument();
    expect(screen.getByText('Please reload the page.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reload Page' })
    ).toBeInTheDocument();
  });

  it('reloads the page when the button is clicked', async () => {
    render(<FallbackUI />);

    const reloadButton = screen.getByRole('button', { name: 'Reload Page' });
    await userEvent.click(reloadButton);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
