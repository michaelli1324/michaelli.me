import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Source_Sans_Pro } from '@next/font/google';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans-pro',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${sourceSansPro.className} font-source-sans-pro`}>
      <Component {...pageProps} />
    </main>
  );
}
