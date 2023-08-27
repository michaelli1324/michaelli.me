import NextLink from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface NavItemProps {
  href: string;
  text: string;
  isMobile?: boolean;
}

const NavItem = ({ href, text, isMobile }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return isMobile ? (
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
  ) : (
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

export default NavItem;