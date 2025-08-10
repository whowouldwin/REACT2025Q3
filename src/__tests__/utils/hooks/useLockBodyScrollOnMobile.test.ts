import { renderHook } from '@testing-library/react';

import { useLockBodyScrollOnMobile } from '@/utils/hooks/useLockBodyScrollOnMobile';

function setMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  });
}

describe('useLockBodyScrollOnMobile', () => {
  it('locks body scroll on mobile when shouldLock is true', () => {
    setMatchMedia(true);
    renderHook(() => useLockBodyScrollOnMobile(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('does not lock scroll on desktop', () => {
    setMatchMedia(false);
    renderHook(() => useLockBodyScrollOnMobile(true));
    expect(document.body.style.overflow).toBe('');
  });

  it('removes lock when unmounted', () => {
    setMatchMedia(true);
    const { unmount } = renderHook(() => useLockBodyScrollOnMobile(true));
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
