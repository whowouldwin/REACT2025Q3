import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MainPage } from './MainPage';

vi.mock('@/widgets/modal/ui/Modal', () => ({
  Modal: ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div>
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null,
}));

vi.mock('@/features/auth-form/uncontrolled/ui/UncontrolledForm.tsx', () => ({
  UncontrolledForm: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess}>UF Submit</button>
  ),
}));

vi.mock('@/features/auth-form/react-hook-form/ui/ControlledForm.tsx', () => ({
  ControlledForm: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess}>RHF Submit</button>
  ),
}));

vi.mock('@/widgets/registration-tile/RegistrationTile.tsx', () => ({
  RegistrationTile: ({ entry }: { entry: { id: string } }) => (
    <div data-testid={`tile-${entry.id}`}>{entry.id}</div>
  ),
}));

vi.mock('@/shared/lib/a11y/cx/cx', () => ({
  cx: (...a: string[]) => a.filter(Boolean).join(' '),
}));

vi.mock('@/entities/registration', () => ({
  registrationActions: { clearJustAdded: () => ({ type: 'CLEAR' }) },
  selectRegistrationEntries: (s: { entries: { id: string }[] }) => s.entries,
}));
vi.mock('@/entities/registration/model/selectors.ts', () => ({
  selectJustAddedId: (s: { justAddedId: string | null }) => s.justAddedId,
}));

const dispatchMock = vi.fn();
const useSelectorMock = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
  useSelector: (sel: (s: unknown) => unknown) => useSelectorMock(sel),
}));

function setState(state: {
  entries: { id: string }[];
  justAddedId: string | null;
}) {
  useSelectorMock.mockImplementation((sel: (s: typeof state) => unknown) =>
    sel(state)
  );
  dispatchMock.mockClear();
}

describe('MainPage', () => {
  beforeEach(() => {
    useSelectorMock.mockReset();
    dispatchMock.mockClear();
  });

  it('shows heading, empty state and opens/closes uncontrolled modal', () => {
    setState({ entries: [], justAddedId: null });
    render(<MainPage />);
    expect(
      screen.getByRole('heading', { name: /main page/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /open uncontrolled/i }));
    expect(
      screen.getByRole('heading', { name: /uncontrolled form/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(
      screen.queryByRole('heading', { name: /uncontrolled form/i })
    ).not.toBeInTheDocument();
  });

  it('renders submitted entries list', () => {
    setState({ entries: [{ id: 'a1' }, { id: 'b2' }], justAddedId: null });
    render(<MainPage />);
    expect(screen.queryByText(/no submissions yet/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('tile-a1')).toBeInTheDocument();
    expect(screen.getByTestId('tile-b2')).toBeInTheDocument();
  });
});
