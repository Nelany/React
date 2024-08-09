import { render } from '@testing-library/react';
import { vi } from 'vitest';
import NotFound from './NotFound';

vi.mock('cookies-next', () => ({
  getCookie: vi.fn(() => 'light'),
}));

vi.mock('next/headers', () => ({
  cookies: {},
}));

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');

  return {
    ...actual,
    useLocation: () => ({ search: '' }),
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: '1' }),
    useSearchParams: () => [{ get: () => '1' }],
  };
});

test('renders NotFound component correctly', () => {
  const { container } = render(<NotFound />);
  expect(container).toMatchSnapshot();
});
