import { AppProps } from 'next/app';
import '../styles/index.scss';
import '../styles/Main.scss';
import RootLayout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
