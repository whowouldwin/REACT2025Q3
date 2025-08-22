import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalKeyboard } from '@/widgets/modal/lib/useModalKeyboard.ts';
import { cx } from '@/shared/lib/a11y/cx/cx';
import type { ModalProps } from '@/widgets/modal/types';
import { ModalHeader } from '@/widgets/modal/ui/ModalHeader.tsx';

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useModalKeyboard(isOpen, onClose, contentRef.current);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={cx(
        'fixed inset-0',
        'rounded-2xl bg-white p-6 shadow-xl',
        'border-0',
        'm-auto',
        '[&::backdrop]:bg-black/40'
      )}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      role="dialog"
      aria-modal
      aria-labelledby={titleId}
    >
      <ModalHeader title={title} titleId={titleId} onClose={onClose} />
      {children}
    </dialog>,
    modalRoot
  );
}
