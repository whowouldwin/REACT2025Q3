import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalKeyboard } from '@/widgets/modal/lib/useModalKeyboard.ts';
import { cx } from '@/shared/lib/a11y/cx/cx';
import type { ModalProps } from '@/widgets/modal/types';
import { ModalHeader } from '@/widgets/modal/ui/ModalHeader.tsx';

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  useModalKeyboard(isOpen, onClose, contentRef.current);

  if (!isOpen) return null;
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal
      aria-labelledby={titleId}
    >
      <div
        ref={contentRef}
        className={cx('w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl')}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <ModalHeader title={title} titleId={titleId} onClose={onClose} />
        {children}
      </div>
    </div>,
    modalRoot
  );
}
