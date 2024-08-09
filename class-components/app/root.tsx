import {
  isRouteErrorResponse,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  useRouteError,
} from '@remix-run/react';
import NotFound from '../src/components/NotFound/NotFound';
import PageProvider from '../src/components/PageProvider/PageProvider';
import Error from '../src/components/Error/Error';

export const meta: MetaFunction = () => {
  return [
    { title: 'Rick and Morty' },
    { name: 'description', content: 'A Rick and Morty fan site' },
    { property: 'og:title', content: 'Rick and Morty' },
    { property: 'og:description', content: 'A Rick and Morty fan site' },
  ];
};

export function links() {
  return [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: '/styles/Main.scss' },
  ];
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

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {isRouteErrorResponse(error) && <NotFound />}

        {error instanceof Error && (
          <Error/>
        )}
        {!(error instanceof Error) && !isRouteErrorResponse(error) && (
          <h1>Unknown Error</h1>
        )}
        <Scripts />
      </body>
    </html>
  );
}
