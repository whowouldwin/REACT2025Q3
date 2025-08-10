import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppSelector, useAppDispatch } from '@/state/store/hooks.ts';
import {
  clearSelection,
  selectSelectedIds,
  selectSelectedItems,
} from '@/state/store/selectedItemsSlice.ts';

import type { Character } from '@/utils/types/rickAndMorty.ts';

export const Flyout: FC = () => {
  const selectedIds = useAppSelector(selectSelectedIds);
  const selectedItems = useAppSelector(selectSelectedItems);
  const dispatch = useAppDispatch();

  const handleUnselectAll = () => {
    dispatch(clearSelection());
  };

  const handleDownload = () => {
    if (selectedItems.length === 0) return;

    const escapeCsvValue = (value: unknown): string => {
      if (value === undefined || value === null) return '';
      if (typeof value !== 'string') return String(value);
      return value.includes(',') || value.includes('"')
        ? `"${value.replace(/"/g, '""')}"`
        : value;
    };

    const headers: (keyof Character)[] = [
      'id',
      'name',
      'status',
      'species',
      'gender',
      'image',
    ];

    const csvRows = selectedItems.map((item) =>
      headers.map((key) => escapeCsvValue(item[key])).join(',')
    );

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedIds.length}_items.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedIds.length === 0) return null;

  return (
    <div
      className={twMerge(
        'fixed bottom-0 left-0 right-0 border-t p-4 shadow-lg z-50',
        'bg-bg border-border'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-text-primary">
          {selectedIds.length}{' '}
          {selectedIds.length === 1 ? 'item is' : 'items are'} selected
        </div>
        <div className="space-x-4">
          <button
            onClick={handleUnselectAll}
            className={twMerge(
              'px-4 py-2 rounded transition-colors cursor-pointer',
              'bg-bg-secondary text-text-primary'
            )}
          >
            Unselect all
          </button>
          <button
            onClick={handleDownload}
            className={twMerge(
              'px-4 py-2 rounded transition-colors cursor-pointer',
              'bg-accent text-white'
            )}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
