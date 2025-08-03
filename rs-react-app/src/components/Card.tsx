import React, { type ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleItemSelection } from '../store/selectedItemsSlice';

import type { Character } from '../types/rickAndMorty.ts';

interface CardProps extends Character {
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  id,
  name,
  status,
  species,
  image,
  gender,
  isSelected = false,
}) => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(
    (state) => state.selectedItems.selectedIds
  );
  const isChecked = selectedIds.includes(id);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(
      toggleItemSelection({
        id,
        name,
        status,
        species,
        image,
        gender,
      })
    );
  };
  return (
    <div
      className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 w-full max-w-xs h-[420px] flex flex-col ${
        isSelected ? 'bg-gray-700 border border-blue-500/50' : 'hover:shadow-xl'
      }`}
    >
      <div className="relative h-64 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 ">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-7 w-7 cursor-pointer"
          />
        </div>
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
