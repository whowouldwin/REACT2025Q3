import React from 'react';

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center mx-auto max-w-2xl">
    <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
    <p className="text-white">{message}</p>
  </div>
);
