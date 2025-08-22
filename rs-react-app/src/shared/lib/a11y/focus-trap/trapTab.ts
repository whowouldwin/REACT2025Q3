import { getFocusable } from '@/shared/lib/a11y/focus-trap/getFocusable.ts';

export function trapTab(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== 'Tab') return;

  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) return;

  if (!container.contains(active)) return;

  const nodes = getFocusable(container);
  if (nodes.length === 0) return;

  const [first, last] = [nodes[0], nodes[nodes.length - 1]];

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
