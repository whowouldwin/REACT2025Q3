import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Modal } from './Modal';

vi.mock('@/widgets/modal/lib/useModalKeyboard.ts', () => ({
  useModalKeyboard: vi.fn(),
}));

beforeEach(() => {
  const root = document.createElement('div');
  root.id = 'modal-root';
  document.body.appendChild(root);
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
      this.setAttribute('open', '');
    };
  }
  if (!HTMLDialogElement.prototype.show) {
    HTMLDialogElement.prototype.show = function () {
      this.open = true;
      this.setAttribute('open', '');
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
      this.removeAttribute('open');
    };
  }
});

afterEach(() => {
  document.getElementById('modal-root')?.remove();
});

describe('Modal', () => {
  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Hidden">
        Hidden content
      </Modal>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders into #modal-root when open and shows title + children', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Settings">
        <div data-testid="content">Hello</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 2, name: 'Settings' });
    expect(heading).toBeInTheDocument();

    const labelledby = dialog.getAttribute('aria-labelledby');
    expect(labelledby).toBeTruthy();
    if (labelledby) {
      const labelledEl = document.getElementById(labelledby);
      expect(labelledEl).toHaveTextContent('Settings');
    }

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('calls onClose when the backdrop (dialog surface) is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose} title="Backdrop">
        Content
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    await user.click(dialog);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the header close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose} title="Close">
        Content
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing if #modal-root is missing', () => {
    document.getElementById('modal-root')?.remove();

    render(
      <Modal isOpen onClose={() => {}} title="NoRoot">
        Content
      </Modal>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
