import { createBrowserRouter } from 'react-router-dom';
import { Main } from '../pages/Main/Main';
import { NotFound } from '../pages/NotFound/NotFound';
import { UncontrolledForm } from '../pages/UncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../pages/ReactHookForm/ReactHookForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/UncontrolledForm',
    element: <UncontrolledForm />,
  },
  {
    path: '/ReactHookForm',
    element: <ReactHookForm />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
