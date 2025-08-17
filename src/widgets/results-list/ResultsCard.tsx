'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { Card } from '../../entities/character/ui/Card';
import { Link, usePathname } from '../../i18n/navigation';
import { Character } from '../../utils/types/rickAndMorty';

interface Props {
  character: Character;
  isSelected: boolean;
}

export const ResultsCard: React.FC<Props> = ({ character, isSelected }) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParam || '');
  params.set('details', character.id.toString());
  const url = `${pathname}?${params.toString()}`;

  return (
    <Link href={url}>
      <div
        key={character.id}
        // onClick={handleClick}
        className={`cursor-pointer w-full transition-all duration-300 ${
          isSelected
            ? 'ring-4 ring-blue-500 ring-opacity-75 z-10 rounded-xl shadow-lg shadow-blue-500/20'
            : ''
        }`}
      >
        <Card {...character} isSelected={isSelected} />
      </div>
    </Link>
  );
};
