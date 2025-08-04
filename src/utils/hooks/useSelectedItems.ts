import { useAppSelector } from '../../state/store/hooks.ts';
import { selectSelectedIds } from '../../state/store/selectedItemsSlice.ts';

import type { Character } from '../types/rickAndMorty.ts';

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
