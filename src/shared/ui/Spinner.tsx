import React from 'react';

interface Props {
  message?: string;
}

export const Spinner: React.FC<Props> = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="w-12 h-12 border-4 rounded-full animate-spin mb-4 border-accent border-t-transparent"></div>
    {message && <p className="font-medium text-text-secondary">{message}</p>}
  </div>
);
