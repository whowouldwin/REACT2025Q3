import { type FC } from 'react';

interface CrashButtonProps {
  onCrash: () => void;
}

export const CrashButton: FC<CrashButtonProps> = ({ onCrash }) => {
  return (
    <button className="btn btn-danger" onClick={onCrash}>
      Error Button
    </button>
  );
};
