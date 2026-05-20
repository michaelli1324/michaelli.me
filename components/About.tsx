import MiliText from '@components/MiliText';

const About = () => (
  <div className="flex flex-col items-center">
    <div className="mb-4 flex flex-col gap-0 whitespace-pre-line text-center">
      <span className="block">Hi I am Michael</span>
      <span className="block">
        I also go by <MiliText text="mili" className="font-bold" />
      </span>
      <span className="block">Welcome to my site</span>
    </div>
    <div className="italic">- famous poet</div>
  </div>
);

export default About;
