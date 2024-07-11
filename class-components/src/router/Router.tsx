import { createBrowserRouter } from 'react-router-dom';
import { Details } from '../components/Details/Details';
import { NotFound } from '../pages/NotFound/NotFound';
import { Main } from '../pages/Main/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [{ path: 'details/:id', element: <Details /> }],
  },
  { path: '*', element: <NotFound /> },
]);
