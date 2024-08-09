import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import root from '../../../app/root';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');

  return {
    ...actual,
    isRouteErrorResponse: () => vi.fn(() => true),
  };
});

describe('RootLayout', () => {
  it('renders the RootLayout component', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: root,
      },
    ]);
    render(<RemixStub />);

    expect(screen.getByText('Rick and Morty')).toBeInTheDocument();
  });
});
