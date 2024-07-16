import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { ThemeProvider } from './ThemeContext/ThemeContext';

const rootElement = document.getElementById('root')!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);
