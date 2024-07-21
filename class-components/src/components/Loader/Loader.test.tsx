import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from './Loader';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
