import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
 
  {
    title: 'See What I\'m Up To',
    Svg: require('../../static/img/dice_2.svg').default,
    description: (
      <>
        You can find my various writeups and notes in <a href="/docs/intro">docs</a> and for my reading list and my opinion on various cybersecurity topics, check out my <a href="/blog">blog</a>.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--2')}>
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
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '28vh'}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
