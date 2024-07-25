import { createBrowserRouter } from 'react-router-dom';
import { Details } from '../components/Details/Details';
import { ErrorBoundaryWrapper } from '../components/ErrorBoundary/ErrorBoundaryWrapper';
import { Main } from '../pages/Main/Main';
import { NotFound } from '../pages/NotFound/NotFound';

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
