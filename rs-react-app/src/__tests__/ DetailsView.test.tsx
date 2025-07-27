import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { describe, it, vi, expect, beforeEach } from 'vitest';

import * as api from '../api/rickAndMorty';
import { DetailsView } from '../components/DetailsView.tsx';

vi.mock('../api/rickAndMorty');

const mockedCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('DetailsView', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  interface WrapperProps {
    initialEntries?: string[];
  }

  function Wrapper({ initialEntries = ['/details?details=1'] }: WrapperProps) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <DetailsView />
      </MemoryRouter>
    );
  }

  it('renders nothing if no details param is present', () => {
    render(<Wrapper initialEntries={['/']} />);
    expect(screen.queryByText(/Loading character/i)).toBeNull();
  });

  it('displays loading state', async () => {
    vi.spyOn(api, 'getCharacterById').mockImplementation(
      () => new Promise(() => {})
    );
    render(<Wrapper />);
    expect(screen.getByText(/Loading character details/i)).toBeInTheDocument();
  });

  it('renders character details when loaded', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(mockedCharacter);
    render(<Wrapper />);
    expect(screen.getByText(/Loading character details/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Alive/i)).toHaveClass('text-green-400');
      expect(screen.getByText(/Human/i)).toBeInTheDocument();
    });
  });

  it('shows error message when character not found', async () => {
    vi.spyOn(api, 'getCharacterById').mockRejectedValue(new Error('404'));
    render(<Wrapper />);
    await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });
  });

  it('removes details from URL on close button click', async () => {
    vi.spyOn(api, 'getCharacterById').mockResolvedValue(mockedCharacter);

    const TestWrapper = () => {
      const [searchParams] = useSearchParams();
      return (
        <>
          <p data-testid="url-details">{searchParams.get('details')}</p>
          <DetailsView />
        </>
      );
    };

    render(
      <MemoryRouter initialEntries={['/somepage?details=1']}>
        <TestWrapper />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Rick Sanchez/i));

    const closeButton = screen.getByLabelText(/Close details/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByTestId('url-details').textContent).toBe('');
    });
  });
});
