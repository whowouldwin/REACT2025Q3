import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  onClickOutside?: () => void;
}

export const OverlayWrapper: React.FC<Props> = ({
  children,
  onClickOutside,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && onClickOutside) {
      onClickOutside();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 lg:static lg:bg-transparent p-4 lg:p-0"
      onClick={handleClick}
    >
      <aside
        className={twMerge(
          'w-full max-w-md lg:w-full',
          'p-6 rounded-lg shadow-xl relative border',
          'border border-border',
          'bg-bg-secondary'
        )}
      >
        {children}
      </aside>
    </div>
  );
};
