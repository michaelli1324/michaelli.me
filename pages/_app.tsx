import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Source_Sans_Pro } from '@next/font/google';
import { VechaiProvider } from '@vechaiui/react';
import { ColorScheme, extendTheme, colors } from '@vechaiui/react';

const sourceSansPro = Source_Sans_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans-pro',
});

const cool: ColorScheme = {
  id: 'cool',
  type: 'dark',
  colors: {
    bg: {
      base: colors.gray['600'],
      fill: colors.gray['500'],
    },
    text: {
      foreground: colors.gray['100'],
      muted: colors.gray['300'],
    },
    primary: colors.teal,
    neutral: colors.gray,
  },
};

const light: ColorScheme = {
  id: 'light',
  type: 'light',
  colors: {
    bg: {
      base: colors.gray['600'],
      fill: colors.gray['500'],
    },
    text: {
      foreground: colors.gray['100'],
      muted: colors.gray['300'],
    },
    primary: colors.teal,
    neutral: colors.gray,
  },
};

const theme = extendTheme({
  cursor: 'pointer',
  colorSchemes: {
    light,
    cool,
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <VechaiProvider theme={theme} colorScheme="light">
      <main className={`${sourceSansPro.className} font-source-sans-pro`}>
        <Component {...pageProps} />
      </main>
    </VechaiProvider>
  );
}
