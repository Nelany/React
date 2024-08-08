import { Links, Meta, MetaFunction, Outlet, Scripts } from '@remix-run/react';
import PageProvider from '../src/components/PageProvider/PageProvider';
import '../styles/Main.scss';

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick and Morty' },
    { name: 'description', content: 'A Rick and Morty fan site' },
    { property: 'og:title', content: 'Rick and Morty' },
    { property: 'og:description', content: 'A Rick and Morty fan site' },
  ];
};

export function links() {
  return [{ rel: 'icon', href: '/favicon.ico' }];
}

export default function RootLayout() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <PageProvider>
          <Outlet />
        </PageProvider>
        <Scripts />
      </body>
    </html>
  );
}
