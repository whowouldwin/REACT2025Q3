import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useModalKeyboard } from './useModalKeyboard';

describe('useModalKeyboard', () => {
  let onClose: () => void;
  let contentEl: HTMLElement;

  beforeEach(() => {
    onClose = vi.fn();
    contentEl = document.createElement('div');
    document.body.appendChild(contentEl);
  });

  afterEach(() => {
    contentEl.remove();
  });

  it('calls onClose on Escape', () => {
    renderHook(() => useModalKeyboard(true, onClose, contentEl));

    const esc = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(esc);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('focuses the first focusable element on open', () => {
    const btn = document.createElement('button');
    contentEl.appendChild(btn);

    renderHook(() => useModalKeyboard(true, onClose, contentEl));

    expect(document.activeElement).toBe(btn);
  });

  it('does nothing if there are no focusable elements (no crash)', () => {
    renderHook(() => useModalKeyboard(true, onClose, contentEl));
    expect(document.activeElement).not.toBe(contentEl);
  });
});
