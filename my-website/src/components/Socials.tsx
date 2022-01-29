import React, { useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import Icon from '@mui/material/Icon';

const socialDetails = [
  {
    name: 'linkedin',
    classname: 'fab fa-linkedin fa-fw',
    link: 'https://www.linkedin.com/in/nathan-burns-3613351b5/',
  },
  {
    name: 'github',
    classname: 'fab fa-github fa-fw',
    link: 'https://github.com/AlbinoGazelle',
  },
  {
    name: 'twitter',
    classname: 'fab fa-twitter',
    link: 'https://twitter.com/AlbinoGazelle',
  },
  {
    name: 'mail',
    classname: 'fas fa-envelope',
    link: 'mailto:nathan@nburns.tech',
  },
];

const getHoverIconColor = (site: string): string => {
  switch (site) {
    case 'linkedin':
      return '#0a66c2';
    case 'github':
      return 'purple';
    case 'twitter':
      return '#c4302b';
    case 'mail':
      return 'brown';
    default:
      return 'blue';
  }
};

export const Socials = () => {

  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      if (node.parentNode !== undefined) {
        node.parentNode.removeChild(node);
      }
    };
  }, []);

  return (
    <div>
      {socialDetails.map(cn => {
        return (
          <a
            href={cn.link}
            target="_blank"
            rel="noopener noreferrer"
            key={cn.classname}
          >
            <Icon
              className={cn.classname}
              sx={{
                fontSize: 35,
                marginTop: 1,
                marginRight: 2,
                marginBottom: 3,
                '&:hover': {
                  color: `${getHoverIconColor(cn.name)}`,
                },
              }}
            />
          </a>
        );
      })}
    </div>
  );
};