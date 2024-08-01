import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import Main from '../src/components/Main/Main';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/ThemeContext/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <ErrorBoundary theme="light">
            <Main>{children}</Main>
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
