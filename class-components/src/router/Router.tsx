import { createBrowserRouter } from 'react-router-dom';
import { Main } from '../pages/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: 'detailed', element: <div>Detailed!!!!!!!!!!!!!!!!!!!!!</div> },
    ],
  },
  { path: '*', element: <div>Not Found</div> },
]);
