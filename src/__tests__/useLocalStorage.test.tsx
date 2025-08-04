import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useLocalStorage } from '../utils/hooks/useLocalStorage.ts';

describe('useLocalStorage (real)', () => {
  const key = 'searchText';

  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [value] = result.current;
    expect(value).toBe('default');
  });

  it('returns value from localStorage if present', () => {
    localStorage.setItem(key, JSON.stringify('existing'));
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [value] = result.current;
    expect(value).toBe('existing');
  });

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));

    const [, setValue] = result.current;

    act(() => {
      setValue('new value');
    });

    const [newVal] = result.current;
    expect(newVal).toBe('new value');
    expect(localStorage.getItem(key)).toBe(JSON.stringify('new value'));
  });

  it('removes value from localStorage and resets to default', () => {
    localStorage.setItem(key, JSON.stringify('to be removed'));

    const { result } = renderHook(() => useLocalStorage(key, 'fallback'));

    const [, , removeValue] = result.current;

    act(() => {
      removeValue();
    });

    const [afterRemove] = result.current;
    expect(afterRemove).toBe('fallback');
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('handles invalid JSON gracefully', () => {
    localStorage.setItem(key, '{invalid json');
    const { result } = renderHook(() => useLocalStorage(key, 'safe fallback'));

    const [val] = result.current;
    expect(val).toBe('safe fallback');
  });
});
