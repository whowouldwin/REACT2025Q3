import React from 'react';

import type { Character } from '../types/rickAndMorty.ts';

interface CardProps extends Character {
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  name,
  status,
  species,
  image,
  gender,
  isSelected = false,
}) => {
  return (
    <div
      className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 w-full max-w-xs h-[420px] flex flex-col ${
        isSelected
          ? 'bg-gray-700 border border-blue-500/50'
          : 'hover:shadow-xl hover:scale-[1.02] hover:translate-y-[-4px]'
      }`}
    >
      <div className="relative h-64 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Selected
          </div>
        )}
      </div>
      <div
        className={`p-4 flex-1 flex flex-col ${isSelected ? 'bg-gradient-to-b from-gray-700 to-gray-800' : ''}`}
      >
        <h3
          className={`text-xl font-bold mb-2 truncate ${isSelected ? 'text-blue-300' : 'text-white'}`}
        >
          {name}
        </h3>
        <p className="text-gray-300 mb-1 flex items-center">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
              status === 'Alive'
                ? 'bg-green-500'
                : status === 'Dead'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
            }`}
          ></span>
          <span className="truncate">
            {status} — {species}
          </span>
        </p>
        <p className="text-gray-400 truncate">{gender}</p>
      </div>
    </div>
  );
};
