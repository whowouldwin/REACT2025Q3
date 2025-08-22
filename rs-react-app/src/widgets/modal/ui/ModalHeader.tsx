import { cx } from '@/shared/lib/a11y/cx/cx';
import type { ReactNode } from 'react';

type ModalHeaderProps = {
  title: ReactNode;
  titleId: string;
  onClose: () => void;
};

export function ModalHeader({ title, titleId, onClose }: ModalHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 id={titleId} className="text-lg font-semibold">
        {title}
      </h2>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={cx(
          'rounded p-1 text-gray-500 hover:text-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-black/20'
        )}
      >
        ✕
      </button>
    </div>
  );
}
