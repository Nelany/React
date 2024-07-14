import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string = ''
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, value);
    };
  }, []);

  return [value, setValue];
};
