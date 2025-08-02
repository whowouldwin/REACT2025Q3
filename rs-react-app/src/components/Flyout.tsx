import React from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearSelection, selectSelectedIds } from '../store/selectedItemsSlice';

import type { Character } from '../types/rickAndMorty.ts';

interface FlyoutProps {
  getSelectedItems: () => Character[];
}

export const Flyout: React.FC<FlyoutProps> = ({ getSelectedItems }) => {
  const selectedIds = useAppSelector(selectSelectedIds);
  const dispatch = useAppDispatch();

  const handleUnselectAll = () => {
    dispatch(clearSelection());
  };

  const handleDownload = () => {
    const selectedItems = getSelectedItems();
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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          {selectedIds.length}{' '}
          {selectedIds.length === 1 ? 'item is' : 'items are'} selected
        </div>
        <div className="space-x-4">
          <button
            onClick={handleUnselectAll}
            className="px-4 py-2 bg-gray-700 text-white rounded transition-colors hover:bg-gray-600 cursor-pointer"
          >
            Unselect all
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600  text-white rounded transition-colors hover:bg-blue-500 cursor-pointer"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
