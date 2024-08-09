import Cookies from 'js-cookie';
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

  const getInitialTheme = (): string => {
    const cookieTheme = Cookies.get('theme');
    console.log('Initial theme from cookies:', cookieTheme); // Отладочный вывод

    return cookieTheme || 'light';
  };

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      Cookies.set('theme', newTheme, {
        path: '/',
        expires: 7,
        sameSite: 'Lax',
      });
      console.log('New theme set in cookies:', newTheme); // Отладочный вывод

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
