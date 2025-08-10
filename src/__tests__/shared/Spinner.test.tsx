import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Spinner } from '@/shared/spinner/Spinner.tsx';

describe('Spinner', () => {
  it('renders spinner element', () => {
    render(<Spinner />);
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders message when provided', () => {
    render(<Spinner message="Loading data" />);
    expect(screen.getByText('Loading data')).toBeInTheDocument();
  });
});
