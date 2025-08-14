import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { DetailsView } from '@/features/character-details/DetailsView';
import { useGetCharacterByIdQuery } from '@/utils/api/rickAndMorty';

vi.mock('@/utils/api/rickAndMorty', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

type UseGetCharacterByIdQueryResult = ReturnType<
  typeof useGetCharacterByIdQuery
>;

const createQueryResult = (
  overrides: Partial<UseGetCharacterByIdQueryResult>
): UseGetCharacterByIdQueryResult => ({
  data: undefined,
  error: undefined,
  isLoading: false,
  isError: false,
  isSuccess: false,
  refetch: vi.fn(),
  fulfilledTimeStamp: 0,
  originalArgs: undefined,
  requestId: '',
  startedTimeStamp: 0,
  endpointName: 'getCharacterById',
  status: 'uninitialized',
  ...overrides,
});

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams([['details', '1']]), vi.fn()],
  };
});

vi.mock('@/shared/spinner/Spinner', () => ({
  Spinner: () => <div>Loading...</div>,
}));
vi.mock('@/shared/error-message/ErrorMessage', () => ({
  ErrorMessage: () => <div>Error</div>,
}));
vi.mock('@/entities/character/CharacterDetails', () => ({
  CharacterDetails: ({ character }: { character: { name: string } }) => (
    <div>{character.name}</div>
  ),
}));
vi.mock('@/utils/hooks/useLockBodyScrollOnMobile', () => ({
  useLockBodyScrollOnMobile: () => {},
}));

const mockedQuery = vi.mocked(useGetCharacterByIdQuery);

describe('DetailsView', () => {
  it('renders loading', () => {
    mockedQuery.mockReturnValue(createQueryResult({ isLoading: true }));
    render(<DetailsView />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error', () => {
    mockedQuery.mockReturnValue(createQueryResult({ isError: true }));
    render(<DetailsView />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('renders data', () => {
    mockedQuery.mockReturnValue(createQueryResult({ data: { name: 'Rick' } }));
    render(<DetailsView />);
    expect(screen.getByText('Rick')).toBeInTheDocument();
  });
});
