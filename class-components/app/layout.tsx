import React from 'react';
import ServerThemeProvider from '../src/components/ServerThemeProvider/ServerThemeProvider';
import '../styles/index.scss';
import '../styles/Main.scss';

export default function RootLayout({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
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
          <ServerThemeProvider theme={theme}>{children}</ServerThemeProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
