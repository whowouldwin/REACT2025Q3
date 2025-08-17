import { DetailsView } from './DetailsView';
import { fetchCharacter } from '../../utils/api/rickAndMorty';

export const DetailsViewServer = async ({ id }: { id: string }) => {
  const character = await fetchCharacter({ id: id });
  return <DetailsView character={character} />;
};
