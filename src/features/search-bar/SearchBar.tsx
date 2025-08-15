import React, { useState, type FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { useLocalStorage } from '@/utils/hooks/useLocalStorage';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [stored, setStored] = useLocalStorage<string>('searchText', '');
  const [input, setInput] = useState(stored);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed !== stored) setStored(trimmed);

    onSearch(trimmed);
  };

  return (
    <form onSubmit={onSubmit} className="p-4 flex gap-2 justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className={twMerge(
          'px-3 py-2 text-base rounded-md border shadow-sm',
          'bg-bg text-text-primary border-border',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent'
        )}
        aria-label="Search"
      />
      <button type="submit" className="btn btn-dark">
        Search
      </button>
    </form>
  );
};
