import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { vi } from 'vitest';
import { ErrorBoundary } from '../src/components/ErrorBoundary/ErrorBoundary';
import { ResultsSection } from '../src/components/ResultSection/ResultsSection';
import { SearchSection } from '../src/components/SearchSection/SearchSection';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/ThemeContext/ThemeContext';
import Main from './Main';

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
          element: <Main children={undefined} />,
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
          element: <Main children={undefined} />,
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
          element: <Main children={undefined} />,
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
            <Main children={undefined} />
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
