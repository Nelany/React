import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { router } from './Router';
import { Details } from '../components/Details/Details';
import { Main } from '../pages/Main/Main';
import { NotFound } from '../pages/NotFound/NotFound';
import { store } from '../store/store';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

describe('Router', () => {
  test('renders Main component for / route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Main />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('renders Details component for /details/:id route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/123']}>
            <Details />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/unknown-route']}>
            <NotFound />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Ooops... Page not found!')).toBeInTheDocument();
  });

  test('renders Main component for / route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('renders Details component for /details/:id route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/details/123']}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/unknown-route']}>
            <Routes>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Ooops... Page not found!')).toBeInTheDocument();
  });

  test('should be of type Router', () => {
    type PartialRouter = {
      routes?: unknown;
    };

    const isRouter = (
      obj: PartialRouter
    ): obj is ReturnType<typeof createBrowserRouter> => {
      return obj instanceof Object && 'routes' in obj;
    };

    expect(isRouter(router)).toBe(true);
  });
});
