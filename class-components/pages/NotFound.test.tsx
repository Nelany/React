import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/ThemeContext/ThemeContext';
import NotFound from './404';

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
