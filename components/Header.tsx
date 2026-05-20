import Image from 'next/image';
import SocialLinks from '@components/SocialLinks';
import headerImage1 from '@public/images/michael1.jpg';
import headerImage2 from '@public/images/michael2.jpg';
import headerImage3 from '@public/images/michael3.jpg';
import headerImage4 from '@public/images/michael4.jpg';

const headerImages = [headerImage1, headerImage2, headerImage3, headerImage4];

const getImageOfTheDay = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return headerImages[dayOfYear % headerImages.length];
};

const Header = () => {
  const headerImage = getImageOfTheDay();

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
