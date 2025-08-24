import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trapTab } from './trapTab';
import { getFocusable } from '@/shared/lib/a11y/focus-trap/getFocusable.ts';

vi.mock('@/shared/lib/a11y/focus-trap/getFocusable.ts', () => ({
  getFocusable: vi.fn(),
}));

describe('trapTab', () => {
  let container: HTMLElement;
  let first: HTMLButtonElement;
  let middle: HTMLButtonElement;
  let last: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement('div');
    first = document.createElement('button');
    middle = document.createElement('button');
    last = document.createElement('button');

    first.textContent = 'first';
    middle.textContent = 'middle';
    last.textContent = 'last';

    container.append(first, middle, last);
    document.body.appendChild(container);

    vi.mocked(getFocusable).mockReturnValue([first, middle, last]);
  });

  it('cycles focus to first when Tab on last', () => {
    last.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    const spy = vi.spyOn(ev, 'preventDefault');

    trapTab(ev, container);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(first);
  });

  it('cycles focus to last when Shift+Tab on first', () => {
    first.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    const spy = vi.spyOn(ev, 'preventDefault');

    trapTab(ev, container);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(last);
  });

  it('does nothing for non-Tab keys', () => {
    middle.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    const spy = vi.spyOn(ev, 'preventDefault');

    trapTab(ev, container);

    expect(spy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(middle);
  });

  it('does nothing if active element is outside container', () => {
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.focus();

    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    const spy = vi.spyOn(ev, 'preventDefault');

    trapTab(ev, container);

    expect(spy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(outside);
  });
});
