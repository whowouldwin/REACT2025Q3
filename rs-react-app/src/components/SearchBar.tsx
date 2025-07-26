import React, { useState } from 'react';

import { getSearchText, setSearchText } from '../utils/localStorage';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState(getSearchText());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedText = input.trim();
    setSearchText(trimmedText);
    onSearch(trimmedText);
  };

  return (
    <div className="p-4 flex gap-2 justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 text-base rounded-md border border-gray-400 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className="btn btn-dark">
        Search
      </button>
    </div>
  );
};
