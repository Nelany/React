import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { vi } from 'vitest';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Pagination } from './Pagination';

const pushMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
    query: { page: '1' },
    asPath: '/',
  }),
}));

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

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '2' },
    });
  });
});
