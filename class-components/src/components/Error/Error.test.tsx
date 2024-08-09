import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('GlobalError component', () => {
  test('renders GlobalError component with light theme', () => {
    Object.defineProperty(document, 'cookie', {
      value: 'theme=light',
      writable: true,
    });
    render(<Error />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByAltText('Cat')).toBeInTheDocument();
    expect(
      screen.getByText('Reload the application please!')
    ).toBeInTheDocument();
    expect(screen.getByTestId('error-content-container')).toHaveClass(
      'error-content-container light'
    );
  });

  test('renders GlobalError component with dark theme', () => {
    Object.defineProperty(document, 'cookie', {
      value: 'theme=dark',
      writable: true,
    });

    render(<Error />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByAltText('Cat')).toBeInTheDocument();
    expect(
      screen.getByText('Reload the application please!')
    ).toBeInTheDocument();
    expect(screen.getByTestId('error-content-container')).toHaveClass(
      'error-content-container dark'
    );
  });
});
