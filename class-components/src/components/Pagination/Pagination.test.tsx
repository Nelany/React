import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { vi } from 'vitest';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Pagination } from './Pagination';

const pushMock = vi.fn();

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: pushMock,
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

describe('Pagination', () => {
  test('updates URL query parameter when page changes', async () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      characters: { charactersResponse: { info: { next: true } } },
    });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('>'), { force: true });

    expect(pushMock).toHaveBeenCalledWith('/?page=2');
  });
});
