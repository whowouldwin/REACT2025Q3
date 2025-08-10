import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div
    className={twMerge(
      'rounded-lg p-8 m-8 text-center border',
      'bg-error-bg border-error-border text-error-text'
    )}
  >
    <h3 className="text-xl font-bold mb-2">Not Found</h3>
    <p className="text-text-primary">{message}</p>
  </div>
);
