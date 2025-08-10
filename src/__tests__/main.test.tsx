import { describe, it, expect, vi, beforeEach } from 'vitest';

const renderMock = vi.fn();

const createRootMock = vi.fn(() => ({
  render: renderMock,
}));

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock,
}));

vi.mock('../App.tsx', () => ({
  default: vi.fn(() => null),
}));

describe('main.tsx entry file', () => {
  let mockGetElementById: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    console.error = vi.fn();
    mockGetElementById = vi.fn();
    vi.stubGlobal('document', { getElementById: mockGetElementById });
    vi.resetModules();
  });

  it('throws error-boundary if root element is missing', async () => {
    mockGetElementById.mockReturnValue(null);
    await expect(import('../main.tsx')).rejects.toThrow(
      'Root element not found'
    );
  });

  it('renders App if root element is found', async () => {
    const mockElement = {};
    mockGetElementById.mockReturnValue(mockElement);
    await import('../main.tsx');
    expect(createRootMock).toHaveBeenCalledWith(mockElement);
    expect(renderMock).toHaveBeenCalled();
  });
});
