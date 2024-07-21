import { render } from '@testing-library/react';
import { NotFound } from './NotFound';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('renders NotFound component correctly', () => {
  const { container } = render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
