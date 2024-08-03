import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Main from '../Main/Main';
import { PageProps } from '../../types/types';

export default function PageProvider({ characterId, currentPage }: PageProps) {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary theme="light">
            <Main characterId={characterId} currentPage={currentPage} />
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
