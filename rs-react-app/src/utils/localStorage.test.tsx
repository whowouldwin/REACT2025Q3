import {beforeEach, expect, it} from 'vitest';
import {SearchBar} from '../components/SearchBar.tsx';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  localStorage.clear();
})

it('saves search to LS when search button is clicked', async () => {
  render(<SearchBar onSearch={() => {}} />)

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', {name: 'Search'});

  await userEvent.clear(input);
  await userEvent.type(input, ' typed text ');
  await userEvent.click(button);

  const saved = localStorage.getItem('searchText');
  expect(saved).toBe('typed text');
})