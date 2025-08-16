'use client'
import React, { useState, type FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';



// interface SearchBarProps {
//   onSearch: (text: string) => void;
// }

export const SearchBar: FC = ({ }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();


  const [stored, setStored] = useLocalStorage<string>('searchText', '');
  const [input, setInput] = useState(searchParam?.get('search') || '');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const params = new URLSearchParams(searchParam || '');
    if (input) {
      params.set('search', input)
    } else {
      params.delete('search');
    }
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed !== stored) setStored(trimmed);

    replace(`${pathname}?${params.toString()}`)
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
