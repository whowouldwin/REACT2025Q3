import React, { useState, useEffect } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [storedInput, setStoredInput] = useLocalStorage<string>(
    'searchText',
    ''
  );
  const [localInput, setLocalInput] = useState(storedInput);
  useEffect(() => {
    setLocalInput(storedInput);
  }, [storedInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedText = localInput.trim();
    setLocalInput(trimmedText);
    setStoredInput(trimmedText);
    onSearch(trimmedText);
  };

  return (
    <div className="p-4 flex gap-2 justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 text-base rounded-md border border-gray-400 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        value={localInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className="btn btn-dark">
        Search
      </button>
    </div>
  );
};
