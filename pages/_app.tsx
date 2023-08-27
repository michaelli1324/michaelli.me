import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import { VechaiProvider } from '@vechaiui/react';
import { ColorScheme, extendTheme, colors } from '@vechaiui/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    primary: colors.green,
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
      <main className={`${inter.className}`}>
        <Component {...pageProps} />
      </main>
    </VechaiProvider>
  );
}
