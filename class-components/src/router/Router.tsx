import { createBrowserRouter } from 'react-router-dom';
import { Details } from '../components/Details/Details';
import { NotFound } from '../pages/NotFound/NotFound';
import { Main } from '../pages/Main/Main';
import { ErrorBoundaryWrapper } from '../components/ErrorBoundary/ErrorBoundaryWrapper';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundaryWrapper>
        <Main />
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        path: 'details/:id',
        element: (
          <ErrorBoundaryWrapper>
            <Details />
          </ErrorBoundaryWrapper>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <ErrorBoundaryWrapper>
        <NotFound />
      </ErrorBoundaryWrapper>
    ),
  },
]);
