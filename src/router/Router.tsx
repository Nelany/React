import { createBrowserRouter } from 'react-router-dom';
import { Main } from '../pages/Main/Main';
import { NotFound } from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
