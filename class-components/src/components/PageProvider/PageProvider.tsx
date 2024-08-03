'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../ThemeContext/ThemeContext';
import Main from '../Main/Main';

export default function PageProvider() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </ThemeProvider>
  );
}
