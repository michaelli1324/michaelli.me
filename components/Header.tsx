import Image from 'next/image';
import SocialLinks from '@components/SocialLinks';

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/michael1.jpg"
        alt="Michael Li"
        width={200}
        height={200}
        className="mb-8 rounded-full"
      />
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-center text-black md:text-3xl">
          Michael Li
        </h1>
        <h2 className="text-lg text-gray-500">Software Engineer @ Glean</h2>
        <SocialLinks />
      </div>
    </div>
  );
};

export default Header;
