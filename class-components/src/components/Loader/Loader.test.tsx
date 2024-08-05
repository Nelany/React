import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from './Loader';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { id: '1' },
    asPath: '/details/1',
  }),
}));

describe('Loader Component', () => {
  test('the appropriate message is displayed if no cards are present', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/1']}>
            <Loader isLoading={false} needRefresh={true} isError />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('There is nothing here!')).toBeInTheDocument();
  });
});
