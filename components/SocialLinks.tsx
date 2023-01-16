import { FaTwitter, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'Github',
    href: 'https://github.com/michaelli1324',
    icon: FaGithub,
  },
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/in/li-michael/',
    icon: FaLinkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/mili_wee',
    icon: FaTwitter,
  },
];

const SocialLinks = () => {
  return (
    <div className="flex flex-row justify-center mt-4">
      {socialLinks.map((link) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={link.href}
          key={link.name}
          className="mr-4"
        >
          <link.icon size="1.5em" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
