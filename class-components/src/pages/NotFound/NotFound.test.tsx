import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './NotFound';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

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
