import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Main } from './Main';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { ResultsSection } from '../../components/ResultSection/ResultsSection';
import { SearchSection } from '../../components/SearchSection/SearchSection';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

vi.mock('../../components/SearchSection/SearchSection', () => ({
  SearchSection: vi.fn(() => <div>Mocked SearchSection</div>),
}));
vi.mock('../../components/ResultSection/ResultsSection', () => ({
  ResultsSection: vi.fn(() => <div>Mocked ResultsSection</div>),
}));

describe('Main component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Main component', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Main />,
        },
      ],
      {
        initialEntries: ['/?page=1'],
      }
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
    expect(screen.getAllByAltText('Rick and Morty').length).toBe(1);
  });

  test('navigates to different page on click', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Main />,
        },
        {
          path: '/details/:id',
          element: <div>Details Page</div>,
        },
      ],
      {
        initialEntries: ['/?page=2'],
      }
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Rick and Morty'));
    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('renders SearchSection and ResultsSection components', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Main />,
        },
      ],
      {
        initialEntries: ['/?page=1'],
      }
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    expect(SearchSection).toHaveBeenCalled();
    expect(ResultsSection).toHaveBeenCalled();
  });

  test('creates an error when error button is clicked', () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: (
          <ErrorBoundary theme="light">
            <Main />
          </ErrorBoundary>
        ),
      },
    ]);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Create an error!'));
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
