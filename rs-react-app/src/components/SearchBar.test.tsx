import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { describe, expect, vi, it } from 'vitest';

describe('SearchBar', () => {
  it('calls onSearch with trimmed input when button is clicked', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: ' text ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('text');
  });
});
