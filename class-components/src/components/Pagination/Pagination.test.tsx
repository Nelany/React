import { render, screen, fireEvent, act } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('updates URL query parameter when page changes', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Pagination ifNextPage={true} />,
        },
      ],
      {
        initialEntries: ['/?page=1'],
      }
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('>'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    console.warn(window.location);
    expect(router.state.location.search).toBe('?page=2');
  });
});
