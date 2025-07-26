import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCharacterById } from '../api/rickAndMorty';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export const DetailsView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!detailsId) return;
    setLoading(true);
    getCharacterById(detailsId)
      .then(setCharacter)
      .catch(() => setCharacter(null))
      .finally(() => setLoading(false));
  }, [detailsId]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  return (
    <aside className="w-full lg:w-[40%] p-4 border border-gray-700 rounded bg-gray-800">
      <button
        onClick={handleClose}
        className="mb-4 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
      >
        Close
      </button>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : character ? (
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
          <img
            src={character.image}
            alt={character.name}
            className="rounded mb-4 w-48"
          />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
        </div>
      ) : (
        <p className="text-red-400">Character not found.</p>
      )}
    </aside>
  );
};
