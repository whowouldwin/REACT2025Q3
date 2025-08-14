import { type ChangeEvent, type FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppDispatch, useAppSelector } from '@/state/store/hooks';
import { toggleItemSelection } from '@/state/store/selectedItemsSlice';

import type { Character } from '@/utils/types/rickAndMorty';

interface CardProps extends Character {
  isSelected?: boolean;
}

export const Card: FC<CardProps> = ({
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

  const statusColor =
    status === 'Alive'
      ? 'bg-[hsl(140,70%,45%)]'
      : status === 'Dead'
        ? 'bg-[hsl(0,70%,50%)]'
        : 'bg-[hsl(0,0%,50%)]';

  return (
    <article
      className={twMerge(
        'rounded-xl overflow-hidden shadow-lg transition-all duration-300 w-full max-w-xs h-[420px] flex flex-col border',
        isSelected ? 'bg-bg-secondary border-accent' : 'bg-bg border-border'
      )}
    >
      <div className="relative h-64 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-7 w-7 cursor-pointer"
          />
        </div>
      </div>
      <section
        className={twMerge(
          'p-4 flex-1 flex flex-col',
          isSelected && 'bg-gradient-to-b from-bg-secondary to-bg'
        )}
      >
        <h3
          className={twMerge(
            'text-xl font-bold mb-2 truncate',
            isSelected ? 'text-accent' : 'text-text-primary'
          )}
        >
          {name}
        </h3>
        <p className="mb-1 flex items-center text-text-secondary">
          <span
            className={twMerge(
              'inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0',
              statusColor
            )}
          ></span>
          <span className="truncate">
            {status} — {species}
          </span>
        </p>
        <p className="truncate text-text-secondary">{gender}</p>
      </section>
    </article>
  );
};
