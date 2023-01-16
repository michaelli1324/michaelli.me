import { useState } from 'react';
import NextLink from 'next/link';

interface MobileNavItemProps {
  href: string;
  text: string;
}

const MobileNavItem = ({ href, text }: MobileNavItemProps) => {
  return (
    <li className="w-full py-4 font-semibold text-gray-900 border-b border-gray-300 text-md">
      <NextLink
        href={href}
        className={
          'rounded-lg p-1 font-normal text-gray-600 sm:px-3 sm:py-2  md:inline-block'
        }
      >
        <span className="capsize">{text}</span>
      </NextLink>
    </li>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={
          'ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden'
        }
        aria-label="Toggle menu"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen && <MenuIcon />}
        {isOpen && <CrossIcon />}
      </button>
      {isOpen && (
        <ul className="absolute z-50 flex flex-col w-full h-screen px-8 pt-8 bg-gray-50">
          <MobileNavItem href="/" text="Home" />
          <MobileNavItem href="/music" text="Music" />
        </ul>
      )}
    </>
  );
};

const MenuIcon = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      className="absolute w-5 h-5 text-gray-900"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 17.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CrossIcon = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      className="absolute w-5 h-5 text-gray-900"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export default MobileMenu;
