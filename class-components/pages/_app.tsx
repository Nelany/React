import { AppProps } from 'next/app';
import '../styles/index.scss';
import '../styles/Main.scss';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
