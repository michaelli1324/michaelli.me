import { isDevelopment } from "@lib/environment";
import NavItem from "./elements/NavItem";

type NavItem = {
  href: string;
  text: string;
}

const NavItems = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/posts',
    text: 'Posts',
  },
] as NavItem[];

interface NavProps {
  isMobile?: boolean;
}

const Nav = ({ isMobile }: NavProps) => {
  return <>
    {
      NavItems.map(({ href, text }) => (
        <NavItem key={href} href={href} text={text} isMobile={isMobile} />
      ))
    }
  </>
}

export default Nav;