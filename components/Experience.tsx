import React from 'react';
import Image from 'next/image';
import Section from '@components/elements/Section';
import gleanLogo from '@public/images/glean.jpg';
import metaLogo from '@public/images/meta.png';
import facebookLogo from '@public/images/facebook.png';
import awsLogo from '@public/images/aws.jpg';

const IMAGE_WIDTH = 80;
const IMAGE_HEIGHT = 80;

const pastJobs = [
  {
    company: 'Glean',
    companyLogo: gleanLogo,
    title: 'Software Engineer',
    start: 'May 2022',
    end: 'Present',
  },
  {
    company: 'Meta',
    companyLogo: metaLogo,
    title: 'Software Engineer',
    start: 'Feb 2021',
    end: 'May 2022',
  },
  {
    company: 'Facebook',
    companyLogo: facebookLogo,
    title: 'Software Engineer Intern',
    start: 'Jun 2020',
    end: 'Aug 2020',
  },
  {
    company: 'Amazon AWS',
    companyLogo: awsLogo,
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
            <h4 className="text-lg font-semibold">{job.company}</h4>
            <h5 className="text-base font-medium">{job.title}</h5>
            <p className="text-sm text-gray-500">
              {job.start} - {job.end}
            </p>
          </div>
        </div>
      ))}
    </Section>
  );
};

export default Experience;
