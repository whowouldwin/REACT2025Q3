import { vi } from 'vitest';

const mockStore = {
  searchText: 'previous',
};

const mockSetValue = vi.fn((value) => {
  mockStore.searchText = value;
  try {
    localStorage.setItem('searchText', JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage', error);
  }
});
const mockRemoveValue = vi.fn();

export function useLocalStorage<K extends keyof typeof mockStore>(
  key: K,
  initialValue: (typeof mockStore)[K]
): [(typeof mockStore)[K], (value: (typeof mockStore)[K]) => void, () => void] {
  const value = key in mockStore ? mockStore[key] : initialValue;
  return [value, mockSetValue, mockRemoveValue];
}

export const __mocks__ = {
  setValue: mockSetValue,
  removeValue: mockRemoveValue,
  resetMocks: () => {
    mockSetValue.mockClear();
    mockRemoveValue.mockClear();
  },
  resetStore: () => {
    mockStore.searchText = 'previous';
    try {
      localStorage.setItem('searchText', JSON.stringify('previous'));
    } catch (error) {
      console.warn('Failed to save to localStorage', error);
    }
  },
};
