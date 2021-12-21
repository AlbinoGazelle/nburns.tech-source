import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
 
  {
    title: 'Docs and Tutorials',
    Svg: require('../../static/img/home_dice_1.svg').default,
    description: (
      <>
        In <a href="/docs/welcome">docs</a> you'll find writeups for various cybersecurity challenges and competitions and also miscellaneous technical tutorials.
      </>
    ),
  },
  {
    title: 'Blog',
    Svg: require('../../static/img/home_dice_2.svg').default,
    description: (
      <>
        My <a href="/blog">blog</a> contains my thoughts on various cybersecurity/technical topics and also my current reading list and book reviews.
      </>
    ),
  },
  {
    title: 'Contact Me',
    Svg: require('../../static/img/home_dice_3.svg').default,
    description: (
      <>
        You can contact me at my email (coming soonish), or add me as a connection on my <a href="https://www.linkedin.com/in/nathan-burns-3613351b5/">linkedIn</a> 
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
        <h3>{title}</h3>
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