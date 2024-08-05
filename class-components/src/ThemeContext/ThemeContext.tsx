'use client';
import { getCookie, setCookie } from 'cookies-next';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  const getInitialTheme = () => {
    return getCookie('theme') || 'light';
  };

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setCookie('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
