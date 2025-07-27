import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { __mocks__ } from '../hooks/__mocks__/useLocalStorage.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

vi.mock('../hooks/useLocalStorage');

describe('useLocalStorage (mocked)', () => {
  beforeEach(() => {
    __mocks__.resetMocks();
    __mocks__.resetStore();
  });

  it('returns the value from the mock store', () => {
    const { result } = renderHook(() =>
      useLocalStorage('searchText', 'default')
    );

    const [value] = result.current;
    expect(value).toBe('previous');
  });

  it('calls setValue when updating the value', () => {
    const { result } = renderHook(() =>
      useLocalStorage('searchText', 'default')
    );

    const [, setValue] = result.current;

    act(() => {
      setValue('new value');
    });

    expect(__mocks__.setValue).toHaveBeenCalledWith('new value');
  });

  it('calls removeValue when removing the value', () => {
    const { result } = renderHook(() =>
      useLocalStorage('searchText', 'default')
    );

    const [, , removeValue] = result.current;

    act(() => {
      removeValue();
    });

    expect(__mocks__.removeValue).toHaveBeenCalled();
  });
});
