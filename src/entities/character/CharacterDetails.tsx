import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { Character } from '@/utils/types/rickAndMorty';

interface Props {
  character: Character;
}

export const CharacterDetails: React.FC<Props> = ({ character }) => {
  return (
    <div className={twMerge('pt-6 text-primary')}>
      <h2 className={twMerge('text-2xl font-bold mb-4 text-accent')}>
        {character.name}
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={character.image}
          alt={character.name}
          className={twMerge(
            'rounded-lg mb-4 w-full md:w-48 object-cover shadow-lg border border-border'
          )}
        />
        <div className="flex-1">
          <div className={twMerge('p-4 rounded-lg mb-4 bg-white/5')}>
            <p className="mb-2">
              <span className="text-secondary font-medium">Status:</span>
              <span
                className={twMerge(
                  'ml-2',
                  character.status === 'Alive'
                    ? 'text-green-400'
                    : character.status === 'Dead'
                      ? 'text-red-400'
                      : 'text-yellow-400'
                )}
              >
                {character.status}
              </span>
            </p>
            <p>
              <span className="text-secondary font-medium">Species: </span>
              <span className="text-accent">{character.species}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
