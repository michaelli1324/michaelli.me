import { PropsWithChildren } from 'react';

interface SectionProps {
  heading?: string;
}

const Section = ({ heading, children }: PropsWithChildren<SectionProps>) => {
  return (
    <section className="flex flex-col items-start justify-start mb-12 text-base">
      {heading && (
        <h3 className="mb-4 text-xl font-bold text-start">{heading}</h3>
      )}
      {children}
    </section>
  );
};

export default Section;
