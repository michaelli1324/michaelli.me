import Image from 'next/image';
import SocialLinks from '@components/SocialLinks';

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/michael.jpg"
        alt="Michael Li"
        width={150}
        height={150}
        className="mb-8 rounded-full"
      />
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center text-black md:text-3xl">
          Michael Li
        </h1>
        <h2 className="text-lg text-gray-500">Software Engineer at Glean</h2>
        <SocialLinks />
      </div>
    </div>
  );
};

export default Header;
