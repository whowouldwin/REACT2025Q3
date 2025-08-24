import { describe, it, expect } from 'vitest';
import { getFocusable } from './getFocusable';

describe('getFocusable', () => {
  it('returns focusable elements in order', () => {
    const container = document.createElement('div');

    const link = document.createElement('a');
    link.href = '#';
    const button = document.createElement('button');
    const input = document.createElement('input');

    container.append(link, button, input);

    const result = getFocusable(container);
    expect(result).toEqual([link, button, input]);
  });

  it('ignores disabled controls and tabindex=-1', () => {
    const container = document.createElement('div');

    const enabledBtn = document.createElement('button');
    const disabledBtn = document.createElement('button');
    disabledBtn.disabled = true;

    const customTab = document.createElement('div');
    customTab.setAttribute('tabindex', '0');

    const excluded = document.createElement('div');
    excluded.setAttribute('tabindex', '-1');

    container.append(enabledBtn, disabledBtn, customTab, excluded);

    const result = getFocusable(container);
    expect(result).toContain(enabledBtn);
    expect(result).toContain(customTab);
    expect(result).not.toContain(disabledBtn);
    expect(result).not.toContain(excluded);
  });

  it('returns empty array when nothing focusable', () => {
    const container = document.createElement('div');
    container.append(
      document.createElement('span'),
      document.createElement('div')
    );
    expect(getFocusable(container)).toEqual([]);
  });
});
