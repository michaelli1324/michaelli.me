import React from 'react';
import Gallery from '../../components/Gallery'

import Facebook from '../../assets/images/thumbs/facebook.svg'
import AWS from '../../assets/images/thumbs/aws.png'
import Kelda from '../../assets/images/thumbs/kelda.png'
import Yext from '../../assets/images/thumbs/yext.png'
import BerkeleyTime from '../../assets/images/thumbs/berkeleytime.png'

const EXPERIENCE_IMAGES = [
    {
      background: '#4267B2', 
      thumbnail: Facebook, 
      caption: 'Facebook', 
      role: "Software Engineering Intern", 
      description: 'Enable enterprise customers to control their payment methods and internal data',
      link: 'https://business.facebook.com/',
    },
    {
      background: '#FF9900', 
      thumbnail: AWS, 
      caption: 'Amazon AWS', 
      role: "Software Engineering Intern", 
      description: 'Reduce customer error on AWS fraud detection platform through a diff checker tool',
      link: 'https://aws.amazon.com/',
    },
    {
      background: '#FFFFFF', 
      thumbnail: Kelda, 
      caption: 'Kelda', 
      role: "Software Engineering Intern", 
      description: 'Utilize Kubernetes to develop ephemeral staging environments, enhancing developer productivity',
      link: 'https://www.kelda.io/',
    },
    {
      background: '#000000', 
      thumbnail: Yext, 
      caption: 'Yext', 
      role: "Software Engineering Intern", 
      description: 'Work with consulting team to build custom pages with optimized content to drive search traffic. and increase customer engagement',
      link: 'https://www.yext.com/',
    },
    {
      background: 'rgb(91, 177, 224)', 
      thumbnail: BerkeleyTime, 
      caption: 'BerkeleyTime', 
      role: "Product Manager", 
      description: 'Develop new features on the course discovery web application, allowing students to better navigate course enrollment on campus',
      link: 'https://berkeleytime.com',
    },
];

class Work extends React.Component {
    render() {
        return (
            <section id="three" class="work">
                <header class="major">
                  <h2>Experience</h2>
                </header>
                

                <Gallery images={EXPERIENCE_IMAGES.map(({ id, background, thumbnail, caption, role, description, link }, i) => ({
                    thumbnail,
                    background,
                    caption,
                    role,
                    description,
                    link,
                }))} />
            </section>
    );
    }
}

export default Work