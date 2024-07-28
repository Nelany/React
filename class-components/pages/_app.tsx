import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/ThemeContext/ThemeContext';
import '../styles/index.scss';
import '../styles/Main.scss';
import Layout from './Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
