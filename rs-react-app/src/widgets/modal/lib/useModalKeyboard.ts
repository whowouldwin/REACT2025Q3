import { useEffect } from 'react';
import { getFocusable, trapTab } from '@/shared/lib/a11y/focus-trap';

export function useModalKeyboard(
  isOpen: boolean,
  onClose: () => void,
  contentEl: HTMLElement | null
) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (contentEl) trapTab(event, contentEl);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, contentEl]);

  useEffect(() => {
    if (!isOpen || !contentEl) return;
    const focusable = getFocusable(contentEl);
    focusable[0]?.focus();
  }, [isOpen, contentEl]);
}
