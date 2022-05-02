import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SocialLinks from '../components/_Socials';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          
          <Box sx={{ display: 'flex' }}>
            <Box m="auto">
              <Avatar
                alt="Nathan Burns"
                src={useBaseUrl('/img/pp.png')}
                sx={{ width: 200, height: 200, m: 2 }}
              />
            </Box>
          </Box>
          
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          
          <SocialLinks />

          <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/CTFs/NahamCon_2022/Intro">
           New: NahamCon 2022 CTF Writeups
          </Link> 
          <p classname="button button--secondary button--lg"></p>
          </div>
          </div>
      </header>
    );
  }

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`nburns.tech`}
      description="Hacker, Reader, Hiker, and Friend.">
          
      <HomepageHeader />
      <main>
        
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
