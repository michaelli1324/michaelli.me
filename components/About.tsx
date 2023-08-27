import Section from '@components/elements/Section';

const About = () => {
  return <Section heading="About Me">
    <p className="whitespace-pre-line">
      {`Hi there! I'm glad to see you've stumbled upon my little corner of the internet. I use this site as an online resume, blog, and creative outlet all in one.

    I am always open to connecting with new people over shared interests, so please don't hesitate to `}<a className="text-sky-600" href="mailto:michael.li1324@gmail.com">get in touch</a>{` if you'd like to collaborate on a project or meet up for coffee.`}
    </p>
  </Section>;

};

export default About;
