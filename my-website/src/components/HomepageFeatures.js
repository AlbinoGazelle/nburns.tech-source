import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
 
  {
    title: 'Docs',
    Svg: require('../../static/img/home_dice_1.svg').default,
    description: (
      <>
        Looking for some technical tutorials and competition writeups? Check out the <a href="/docs/welcome">docs</a> section!
      </>
    ),
  },
  {
    title: 'Blog',
    Svg: require('../../static/img/home_dice_2.svg').default,
    description: (
      <>
        My <a href="/blog">blog</a> contains my thoughts on various topics, malware analysis posts, what I'm reading, and more!
      </>
    ),
  },
  {
    title: 'Contact',
    Svg: require('../../static/img/home_dice_3.svg').default,
    description: (
      <>
        You can <a href="https://nburns.tech/contact">contact</a> me at my <a href="mailto:nathan@nburns.tech">email</a>, or add me as a connection on my <a href="https://www.linkedin.com/in/nathan-burns-3613351b5/">linkedIn</a>.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <a href={title}><h3>{title}</h3></a>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
    return (
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    );
  }