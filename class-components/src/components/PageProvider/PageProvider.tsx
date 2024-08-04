'use client';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import Main from '../Main/Main';

export default function PageProvider() {
  return (
    <Suspense fallback={null}>
      <ThemeProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    </Suspense>
  );
}
