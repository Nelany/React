import React from 'react';
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
          {children}
        </React.StrictMode>
      </body>
    </html>
  );
}
