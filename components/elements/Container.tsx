import Head from 'next/head';
import { useRouter } from 'next/router';
import MobileMenu from '@components/MobileMenu';
import Nav from '@components/Nav';

interface ContainerProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
}

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: 'Michael Li',
    description: `Software Engineer`,
    image: 'https://michaelli.me/images/banner.jpg',
    type: 'website',
    ...customMeta,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://michaelli.me${router.asPath}`}
        />
        <link rel="canonical" href={`https://michaelli.me${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Michael Li" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mili_wee" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta?.date && (
          <meta property="article:published_time" content={meta?.date} />
        )}
      </Head>
      <div className="mx-auto flex max-w-3xl flex-col justify-center px-8">
        <nav className="relative flex justify-flex-start w-full max-w-2xl items-center border-gray-200 bg-gray-50 bg-opacity-60 pt-8 pb-8 text-gray-900 sm:pb-8">
          <div className="ml-[-0.60rem] w-full md:block md:w-auto">
            <MobileMenu />
            <Nav />
          </div>
        </nav>
        {children}
        <div id="footer" />
      </div>
    </div>
  );
}
