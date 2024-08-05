import { useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string = ''
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const storedValue = localStorage.getItem(key);

    return storedValue !== null ? storedValue : initialValue;
  });

  return [value, setValue];
};
