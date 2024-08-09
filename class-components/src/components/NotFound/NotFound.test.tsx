import { render } from '@testing-library/react';
import { vi } from 'vitest';
import NotFound from './NotFound';

vi.mock('cookies-next', () => ({
  getCookie: vi.fn(() => 'light'),
}));

vi.mock('next/headers', () => ({
  cookies: {},
}));

test('renders NotFound component correctly', () => {
  const { container } = render(<NotFound />);
  expect(container).toMatchSnapshot();
});
