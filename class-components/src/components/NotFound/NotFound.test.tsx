import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import NotFound from '../../../app/not-found';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
    asPath: '/',
  }),
}));

test('renders NotFound component correctly', () => {
  const { container } = render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <NotFound theme={'light'} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
