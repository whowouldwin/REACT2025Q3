import React from 'react';

import { CloseIcon } from '../../assets/svg-icons';

interface Props {
  onClick: () => void;
}

export const CloseButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all transform hover:scale-105 hover:brightness-110 hover:shadow-md cursor-pointer text-text-primary"
    aria-label="Close details"
  >
    <CloseIcon />
  </button>
);
