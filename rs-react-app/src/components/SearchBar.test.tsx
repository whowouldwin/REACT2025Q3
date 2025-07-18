vi.mock('../utils/localStorage');

import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { describe, expect, vi, it } from 'vitest';

describe('SearchBar rendering', () => {
  it('renders search input and search button', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByDisplayValue('previous')).toBeInTheDocument();
  });
});

describe('SearchBar User Interaction Tests', () => {
  it('trims whitespace from search input before savin', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: ' text ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearchMock).toHaveBeenCalledWith('text');
  });
});
