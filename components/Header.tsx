import Image from 'next/image';
import MiliText from '@components/MiliText';
import SocialLinks from '@components/SocialLinks';
import headerImage1 from '@public/images/michael1.jpg';
import headerImage2 from '@public/images/michael2.jpg';
import headerImage3 from '@public/images/michael3.jpg';
import headerImage4 from '@public/images/michael4.jpg';

const headerImages = [headerImage1, headerImage2, headerImage3, headerImage4];

interface HeaderProps {
  dayOfYear: number;
}

const Header = ({ dayOfYear }: HeaderProps) => {
  const headerImage = headerImages[dayOfYear % headerImages.length];

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-8 h-[200px] w-[200px] overflow-hidden rounded-full">
        <Image
          src={headerImage}
          alt="Michael Li"
          fill
          placeholder="blur"
          className="object-cover"
        />
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-center text-2xl font-bold text-black md:text-3xl">
          <MiliText text="Michael Li" />
        </h1>
        <h2 className="text-lg text-gray-500">Software Engineer @ <a className="text-blue-600 underline hover:text-blue-800" href="https://glean.com">Glean</a></h2>
        <SocialLinks />
      </div>
    </div>
  );
};

export default Header;
