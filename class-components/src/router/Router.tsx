import { createBrowserRouter } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Details } from '../components/Details/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [{ path: 'details', element: <Details /> }],
  },
  { path: '*', element: <div>Not Found</div> },
]);
