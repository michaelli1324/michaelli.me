import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import cn from 'classnames';
import Header from '@components/Header';
import MobileMenu from '@components/MobileMenu';

interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive ? 'font-semibold text-gray-800' : 'font-normal text-gray-600',
        'hidden rounded-lg p-1 transition-all hover:bg-gray-200 sm:px-3 sm:py-2  md:inline-block'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

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
    description: `Software Engineer, Frontend Developer`,
    image: 'https://michaelli.me/static/images/michael.jpg',
    type: 'website',
    ...customMeta,
  };

  return (
    <div className="bg-gray-50">
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
      <div className="flex flex-col justify-center max-w-5xl px-8 mx-auto">
        <nav className="relative flex items-center justify-center w-full max-w-2xl pt-8 pb-8 mx-auto text-gray-900 border-gray-200 bg-gray-50 bg-opacity-60 sm:pb-8">
          <div className="ml-[-0.60rem] w-full md:block md:w-auto">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/music" text="Music" />
          </div>
        </nav>
        <Header />
        {children}
        <div id="footer" />
      </div>
    </div>
  );
}
