import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Main } from './pages/Main';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </React.StrictMode>
);
