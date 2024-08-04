import { act, render } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './ThemeContext';

const ConsumerComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('initial theme is light', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ConsumerComponent />
      </ThemeProvider>
    );
    expect(getByTestId('theme-value').textContent).toBe('light');
  });

  test('toggles theme from light to dark', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ConsumerComponent />
      </ThemeProvider>
    );

    act(() => {
      getByText('Toggle Theme').click();
    });

    expect(getByTestId('theme-value').textContent).toBe('dark');
  });
});
