import Section from '@components/elements/Section';

const About = () => {
  return (
    <Section heading="🎓 Education">
      <p>
        Graduated from UC Berkeley&apos;s&nbsp;
        <a
          className="border-b-2 border-b-gray-800"
          target="_blank"
          rel="noreferrer"
          href="https://met.berkeley.edu/"
        >
          Management, Entrepreneurship, & Technology Program
        </a>
        &nbsp; with a degree in Electrical Engineering Computer Science (EECS)
        and Business Administration
      </p>
    </Section>
  );
};

export default About;
