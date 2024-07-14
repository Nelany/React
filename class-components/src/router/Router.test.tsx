import { render, screen } from '@testing-library/react';
import {
  createBrowserRouter,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Main } from '../pages/Main/Main';
import { Details } from '../components/Details/Details';
import { NotFound } from '../pages/NotFound/NotFound';
import { router } from './Router';

describe('Router', () => {
  test('renders Main component for / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('renders Details component for /details/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('Ooops... Page not found!')).toBeInTheDocument();
  });

  test('renders Main component for / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('renders Details component for /details/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  test('renders NotFound component for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
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
