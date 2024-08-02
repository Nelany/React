'use client';
import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import Main from '../src/components/Main/Main';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/ThemeContext/ThemeContext';
import '../styles/index.scss';
import '../styles/Main.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick and Morty</title>
      </head>
      <body>
        <React.StrictMode>
          <ThemeProvider>
            <Provider store={store}>
              <ErrorBoundary theme="light">
                <Main>{children}</Main>
              </ErrorBoundary>
            </Provider>
          </ThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
