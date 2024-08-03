'use client';

import cookie from 'cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const getInitialTheme = () => {
    const document =
      typeof window !== 'undefined' ? window.document : { cookie: '' };
    const cookies = cookie.parse(document.cookie);

    return cookies.theme || 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.cookie = cookie.serialize('theme', theme, { path: '/' });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
