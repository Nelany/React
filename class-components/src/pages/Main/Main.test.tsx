import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <ErrorBoundary theme="light">
              <Main />
            </ErrorBoundary>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
    expect(screen.getAllByAltText('Rick and Morty').length).toBe(1);
  });

  test('navigates to different page on click', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/?page=2']}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/details/:id" element={<div>Details Page</div>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Rick and Morty'));
    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });

  test('renders SearchSection and ResultsSection components', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <ErrorBoundary theme="light">
              <Main />
            </ErrorBoundary>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(SearchSection).toHaveBeenCalled();
    expect(ResultsSection).toHaveBeenCalled();
  });

  test('creates an error when error button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <ErrorBoundary theme="light">
              <Main />
            </ErrorBoundary>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Create an error!'));
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
