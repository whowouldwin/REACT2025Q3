import React from 'react';

interface CrashButtonProps {
  onCrash: () => void;
}

export const CrashButton: React.FC<CrashButtonProps> = ({ onCrash }) => {
  return (
    <button className="btn btn-danger" onClick={onCrash}>
      Error Button
    </button>
  );
};
