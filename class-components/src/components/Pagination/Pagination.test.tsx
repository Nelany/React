import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Pagination } from './Pagination';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';

describe('Pagination', () => {
  test('updates URL query parameter when page changes', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Pagination />,
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

    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('>'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    expect(router.state.location.search).toBe('?page=2');
  });
});
