import React, { type ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../state/store/hooks.ts';
import { toggleItemSelection } from '../../state/store/selectedItemsSlice.ts';

import type { Character } from '../../utils/types/rickAndMorty.ts';

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
      className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 w-full max-w-xs h-[420px] flex flex-col border"
      style={{
        backgroundColor: isSelected
          ? 'var(--bg-secondary)'
          : 'var(--bg-primary)',
        borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)',
      }}
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
        className="p-4 flex-1 flex flex-col"
        style={{
          background: isSelected
            ? 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))'
            : undefined,
        }}
      >
        <h3
          className="text-xl font-bold mb-2 truncate"
          style={{
            color: isSelected ? 'var(--accent-color)' : 'var(--text-primary)',
          }}
        >
          {name}
        </h3>
        <p
          className="mb-1 flex items-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
            style={{
              backgroundColor:
                status === 'Alive'
                  ? 'hsl(140, 70%, 45%)'
                  : status === 'Dead'
                    ? 'hsl(0, 70%, 50%)'
                    : 'hsl(0, 0%, 50%)',
            }}
          ></span>
          <span className="truncate">
            {status} — {species}
          </span>
        </p>
        <p className="truncate" style={{ color: 'var(--text-secondary)' }}>
          {gender}
        </p>
      </div>
    </div>
  );
};
