import { useState, useEffect, useCallback } from 'react';

import { useLocalStorage } from './useLocalStorage.ts';
import { fetchAll } from '../api/rickAndMorty.ts';
import { FetchError } from '../../features/error/FetchError.ts';

import type { Character } from '../types/rickAndMorty.ts';

export interface CharacterData {
  characters: Character[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  page: number;
  totalPages: number;
  lastCount: number;
  crash: boolean;
  handleSearch: (text: string) => void;
  handlePrev: () => void;
  handleNext: () => void;
  triggerCrash: () => void;
}

export const useCharacterData = (initialPage: number = 1): CharacterData => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchText', '');
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [lastCount, setLastCount] = useState(20);
  const [crash, setCrash] = useState(false);

  const loadCharacters = useCallback(
    async (text: string, pageNum: number) => {
      setLoading(true);
      setError(null);
      if (characters.length > 0) {
        setLastCount(characters.length);
      }

      try {
        const result = await fetchAll(text, pageNum);
        setCharacters(result.results);
        setPage(pageNum);
        setTotalPages(result.info.pages);
      } catch (error) {
        let message = 'Unexpected error-boundary occurred';
        if (error instanceof FetchError) {
          message = error.message;
        } else if (error instanceof Error) {
          message = `Generic error: ${error.message}`;
        }

        setError(message);
        setTotalPages(0);
        setPage(1);
        setLoading(false);
      }
    },
    [characters.length]
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    setPage(1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const triggerCrash = () => setCrash(true);
  useEffect(() => {
    loadCharacters(searchTerm, page);
  }, [page, searchTerm, loadCharacters]);

  return {
    characters,
    loading,
    error,
    searchTerm,
    page,
    totalPages,
    lastCount,
    crash,
    handleSearch,
    handlePrev,
    handleNext,
    triggerCrash,
  };
};
