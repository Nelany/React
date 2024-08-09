import { createContext, ReactNode, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  // const getInitialTheme = async (): Promise<string> => {
  //   const cookie = document.cookie;

  //   return cookie?.theme || 'light';
  // };

  // useEffect(() => {
  //   (async () => {
  //     const initialTheme = await getInitialTheme();
  //     setTheme(initialTheme);
  //   })();
  // }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
