import { vi } from 'vitest';

export const getSearchText = vi.fn(() => {
  return 'previous';
});
export const setSearchText = vi.fn();
