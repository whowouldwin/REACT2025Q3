import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, vi, it, expect } from 'vitest';

import { ErrorBoundary } from '../features/error-boundary/ErrorBoundary.tsx';

const ProblemChild: React.FC = () => {
  throw new Error('ProblemChild');
};

describe('ErrorBoundary', () => {
  const fallbackMessage = 'Fallback Error';
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  it('catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary fallback={<div>{fallbackMessage}</div>}>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(fallbackMessage)).toBeInTheDocument();
  });
});
