import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useGetCharactersQuery } from '@/utils/api/rickAndMorty.ts';
import { useCharacterData } from '@/utils/hooks/useCharacterData.ts';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/utils/api/rickAndMorty.ts', () => ({
  useGetCharactersQuery: vi.fn(),
}));

type QueryResult = ReturnType<typeof useGetCharactersQuery>;

const makeQueryResult = (overrides: Partial<QueryResult> = {}): QueryResult => {
  const base: QueryResult = {
    data: undefined,
    currentData: undefined,
    error: undefined,
    requestId: 'test',
    endpointName: 'getCharacters',
    startedTimeStamp: Date.now(),
    isUninitialized: false,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    refetch: vi.fn(),
    originalArgs: { name: '', page: 1 },
    fulfilledTimeStamp: undefined,
  };
  return { ...base, ...overrides };
};

describe('useCharacterData', () => {
  const setSearchParams = vi.fn();
  const mockedUseSearchParams = vi.mocked(useSearchParams);
  const mockedUseGetCharactersQuery = vi.mocked(useGetCharactersQuery);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams([
        ['name', 'rick'],
        ['page', '1'],
      ]),
      setSearchParams,
    ]);
  });

  it('returns data from API', () => {
    mockedUseGetCharactersQuery.mockReturnValue(
      makeQueryResult({
        data: { info: { pages: 2 }, results: [{ id: 1, name: 'Rick' }] },
        isLoading: false,
        isFetching: false,
        isSuccess: true,
      })
    );

    const { result } = renderHook(() => useCharacterData());

    expect(result.current.characters).toHaveLength(1);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.error).toBeNull();
  });

  it('returns error if API fails', () => {
    mockedUseGetCharactersQuery.mockReturnValue(
      makeQueryResult({
        data: undefined,
        error: new Error('fail'),
        isLoading: false,
        isFetching: false,
        isError: true,
      })
    );

    const { result } = renderHook(() => useCharacterData());
    expect(result.current.error).toBe('Failed to load characters');
  });

  it('handleSearch updates params', () => {
    mockedUseGetCharactersQuery.mockReturnValue(
      makeQueryResult({
        data: { info: { pages: 1 }, results: [] },
        isLoading: false,
        isFetching: false,
        isSuccess: true,
      })
    );

    const { result } = renderHook(() => useCharacterData());
    act(() => result.current.handleSearch('morty'));

    expect(setSearchParams).toHaveBeenCalled();
  });

  it('triggerCrash throws error', () => {
    mockedUseGetCharactersQuery.mockReturnValue(
      makeQueryResult({
        data: { info: { pages: 1 }, results: [] },
        isLoading: false,
        isFetching: false,
        isSuccess: true,
      })
    );

    const { result } = renderHook(() => useCharacterData());
    expect(() => result.current.triggerCrash()).toThrow(
      'Crash triggered manually'
    );
  });
});
