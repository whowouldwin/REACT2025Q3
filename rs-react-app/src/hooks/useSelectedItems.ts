import { useAppSelector } from '../store/hooks';
import { selectSelectedIds } from '../store/selectedItemsSlice';

import type { Character } from '../types/rickAndMorty';

export const useSelectedItems = (allCharacters: Character[]) => {
  const selectedIds = useAppSelector(selectSelectedIds);

  const getSelectedItems = (): Character[] => {
    return allCharacters.filter((character) =>
      selectedIds.includes(character.id)
    );
  };

  return {
    selectedIds,
    getSelectedItems,
  };
};
