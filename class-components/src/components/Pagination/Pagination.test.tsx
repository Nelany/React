import { render, screen, fireEvent, act } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Pagination } from './Pagination';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
