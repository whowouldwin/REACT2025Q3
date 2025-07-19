import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FallbackUI } from './FallbackUI.tsx';

describe('FallbackUI', () => {
  it('renders the fallback message correctly', () => {
    render(<FallbackUI />);
    expect(
      screen.getByRole('heading', { name: 'Something went wrong.' })
    ).toBeInTheDocument();
    expect(screen.getByText('Please reload the page.')).toBeInTheDocument();
  });
});
