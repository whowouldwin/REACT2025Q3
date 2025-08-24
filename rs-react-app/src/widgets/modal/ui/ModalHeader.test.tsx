import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader', () => {
  it('renders the title and applies the given titleId', () => {
    render(<ModalHeader title="Settings" titleId="hdr" onClose={() => {}} />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Settings' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', 'hdr');
  });

  it('has an accessible close button that calls onClose when clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ModalHeader title="t" titleId="id" onClose={onClose} />);
    const closeBtn = screen.getByRole('button', { name: /close/i });

    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('supports ReactNode as title content', () => {
    render(
      <ModalHeader
        title={<span data-testid="node-title">Complex Title</span>}
        titleId="hdr2"
        onClose={() => {}}
      />
    );
    expect(screen.getByTestId('node-title')).toBeInTheDocument();
  });
});
