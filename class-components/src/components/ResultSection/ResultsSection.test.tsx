import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ResultsSection } from './ResultsSection';
import '@testing-library/jest-dom';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

describe('ResultsSection', () => {
  test('matches snapshot when loading', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <ResultsSection />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot with results', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <ResultsSection />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
