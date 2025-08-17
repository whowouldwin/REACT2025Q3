import { useSearchParams } from 'react-router-dom';

import { useGetCharactersQuery } from '../api/rickAndMorty';

import type { Character } from '../types/rickAndMorty';

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

export const useCharacterData = (): CharacterData => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('name') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, error, isLoading, isFetching } = useGetCharactersQuery({
    name: searchTerm,
    page,
  });

  const totalPages = data?.info?.pages ?? 0;
  const characters = data?.results ?? [];
  const lastCount = characters.length;

  const handleSearch = (text: string) => {
    setSearchParams((prev) => {
      prev.set('name', text);
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePrev = () => {
    if (page > 1) {
      setSearchParams((prev) => {
        prev.set('page', String(page - 1));
        return prev;
      });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setSearchParams((prev) => {
        prev.set('page', String(page + 1));
        return prev;
      });
    }
  };

  const triggerCrash = () => {
    throw new Error('Crash triggered manually');
  };

  return {
    characters,
    loading: isLoading || isFetching,
    error: error ? 'Failed to load characters' : null,
    searchTerm,
    page,
    totalPages,
    lastCount,
    crash: false,
    handleSearch,
    handlePrev,
    handleNext,
    triggerCrash,
  };
};
