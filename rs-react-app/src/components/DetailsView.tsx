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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="h-full w-full lg:h-auto flex items-center justify-center bg-black/50 lg:bg-transparent p-4 lg:p-0"
      onClick={handleOverlayClick}
    >
      <aside className="w-full max-w-md lg:w-full p-6 border border-gray-700 rounded-lg bg-gray-800 shadow-xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          aria-label="Close details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300 font-medium">
              Loading character details...
            </p>
          </div>
        ) : character ? (
          <div className="text-white pt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">
              {character.name}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={character.image}
                alt={character.name}
                className="rounded-lg mb-4 w-full md:w-48 object-cover shadow-lg border border-gray-700"
              />
              <div className="flex-1">
                <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                  <p className="mb-2">
                    <span className="text-gray-400 font-medium">Status: </span>
                    <span
                      className={`${character.status === 'Alive' ? 'text-green-400' : character.status === 'Dead' ? 'text-red-400' : 'text-yellow-400'}`}
                    >
                      {character.status}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400 font-medium">Species: </span>
                    <span className="text-blue-300">{character.species}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-red-400 mb-2">Not Found</h3>
            <p className="text-white">
              Character information could not be loaded.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
