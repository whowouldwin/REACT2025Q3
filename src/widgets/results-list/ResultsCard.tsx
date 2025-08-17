import React from 'react';
import { Character } from '../../utils/types/rickAndMorty';
import { Card } from '../../entities/character/ui/Card';



interface Props {
  character: Character;
  isSelected: boolean;
}

export const ResultsCard: React.FC<Props> = ({ character, isSelected }) => {

  // const handleClick = () => {
  //   setSearchParams((prev) => {
  //     prev.set('details', character.id.toString());
  //     return prev;
  //   });
  // };

  return (
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
  );
};
