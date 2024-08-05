import { Metadata } from 'next';
import React from 'react';
import '../styles/index.scss';
import '../styles/Main.scss';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <React.StrictMode>{children}</React.StrictMode>
      </body>
    </html>
  );
}
