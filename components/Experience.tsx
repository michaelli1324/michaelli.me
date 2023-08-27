import React from 'react';
import Image from 'next/image';
import Section from '@components/elements/Section';

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 100;

const pastJobs = [
  {
    company: 'Glean',
    companyLogo: '/images/glean.jpg',
    title: 'Software Engineer',
    start: 'May 2022',
    end: 'Present',
  },
  {
    company: 'Meta',
    companyLogo: '/images/meta.png',
    title: 'Software Engineer',
    start: 'Feb 2021',
    end: 'May 2022',
  },
  {
    company: 'Facebook',
    companyLogo: '/images/facebook.png',
    title: 'Software Engineer Intern',
    start: 'Jun 2020',
    end: 'Aug 2020',
  },
  {
    company: 'Amazon AWS',
    companyLogo: '/images/aws.jpg',
    title: 'Software Engineer Intern',
    start: 'Jun 2019',
    end: 'Aug 2019',
  },
];

const Experience = () => {
  return (
    <Section heading="Experience">
      {pastJobs.map((job) => (
        <div className="flex flex-row mb-8" key={job.company}>
          <Image
            className="border-2 rounded-3xl"
            src={job.companyLogo}
            alt={job.company}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
          />
          <div className="flex flex-col justify-center ml-8">
            <h4 className="text-xl font-bold">{job.company}</h4>
            <h5 className="text-lg font-semibold">{job.title}</h5>
            <p className="text-gray-500">
              {job.start} - {job.end}
            </p>
          </div>
        </div>
      ))}
    </Section>
  );
};

export default Experience;
