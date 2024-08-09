import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { vi } from 'vitest';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Pagination } from './Pagination';

const navigateMock = vi.fn();

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');

  return {
    ...actual,
    useLocation: () => ({ search: '' }),
    useNavigate: () => navigateMock,
    useParams: () => ({ id: '1' }),
    useSearchParams: () => [{ get: () => '1' }],
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

    expect(navigateMock).toHaveBeenCalledWith('/?page=2');
  });
});
