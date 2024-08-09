// import { json, LoaderFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  useRouteError,
} from '@remix-run/react';
// import { parse } from 'cookie';
import NotFound from '../src/components/NotFound/NotFound';
import PageProvider from '../src/components/PageProvider/PageProvider';
// import Error from '../src/components/Error/Error';
// import '../styles/Main.scss';

// import { themeCookie } from '../cookies';

// export const action = async ({ request }: { request: Request }) => {
//   const { theme } = await request.json();

//   return new Response(null, {
//     headers: { 'Set-Cookie': await themeCookie.serialize(theme) },
//   });
// };

// export const loader: LoaderFunction = async ({ request }) => {
//   const cookieHeader = request.headers.get('Cookie');
//   const cookies = cookieHeader ? parse(cookieHeader) : {};
//   const theme = cookies.theme || 'light';

//   return json({ theme });
// };

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
  console.log('Root rerender');

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

// interface LoaderData {
//   theme: string;
// }

// export const loader: LoaderFunction = async ({ request }) => {
//   const cookieHeader = request.headers.get('Cookie');
//   const cookies = cookieHeader ? parse(cookieHeader) : {};
//   const theme = cookies.theme || 'light';

//   return json<LoaderData>({ theme });
// };

export function ErrorBoundary() {
  // eslint-disable-next-line prefer-rest-params
  // console.warn(arguments);
  const error = useRouteError();
  console.log('ErrorBoundary called', error);

  // const [errorMy, setErrorMy] = useState<Error | null>(null);

  // useEffect(() => {
  //   if (error && error instanceof Error) {
  //     setErrorMy(error);
  //   }
  // }, [error]);

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
          // <Error/>
          <div>
            <h1>EEEEEEEEEEError</h1>
          </div>
        )}
        {!(error instanceof Error) && !isRouteErrorResponse(error) && (
          <h1>Unknown Error</h1>
        )}
        <Scripts />
      </body>
    </html>
  );
}
