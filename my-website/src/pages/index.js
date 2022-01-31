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
import { Socials } from '../components/Socials';

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
                sx={{ width: 150, height: 150, m: 2 }}
              />
            </Box>
          </Box>
          
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          
          <Socials />

          <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog/whispergate">
           New: Deconstructing WhisperGate
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
