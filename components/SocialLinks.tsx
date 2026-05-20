import { useCallback, useRef, useState } from 'react';
import { Mail, GitHub, Linkedin, Twitter } from 'react-feather';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:michael.li1324@gmail.com',
    icon: Mail,
  },
  {
    name: 'Github',
    href: 'https://github.com/michaelli1324',
    icon: GitHub,
  },
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/in/li-michael/',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/mili_wee',
    icon: Twitter,
  },
];

const AVOID_RADIUS = 56;
const MAX_OFFSET = 26;

type SocialLink = (typeof socialLinks)[number];

const ShySocialLink = ({ link }: { link: SocialLink }) => {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const Icon = link.icon;

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const zone = zoneRef.current;
    if (!zone) return;

    const rect = zone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < AVOID_RADIUS && distance > 0.5) {
      const proximity = 1 - distance / AVOID_RADIUS;
      const push = MAX_OFFSET * proximity * proximity;
      setOffset({
        x: -(dx / distance) * push,
        y: -(dy / distance) * push,
      });
      return;
    }

    setOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={zoneRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-12 w-12 items-center justify-center"
    >
      <a
        target="_blank"
        rel="noreferrer"
        href={link.href}
        aria-label={link.name}
        className="inline-flex transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <Icon size="1.25em" strokeWidth={2} />
      </a>
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="mt-4 flex flex-row justify-center">
      {socialLinks.map((link) => (
        <ShySocialLink key={link.name} link={link} />
      ))}
    </div>
  );
};

export default SocialLinks;
