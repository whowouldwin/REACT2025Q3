import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { About } from '../../pages/About';

describe('About', () => {
  it('renders the about page correctly', () => {
    render(<About />);
    expect(screen.getByText('About This App')).toBeInTheDocument();
    expect(
      screen.getByText('This is a Rick & Morty application built with React.')
    ).toBeInTheDocument();
    expect(screen.getByText('Author Information')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('whowouldwin')).toBeInTheDocument();
    expect(screen.getByText('GitHub:')).toBeInTheDocument();
    const githubLink = screen.getByRole('link', {
      name: 'github.com/whowouldwin/REACT2025Q3',
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/whowouldwin/REACT2025Q3'
    );
  });
});
