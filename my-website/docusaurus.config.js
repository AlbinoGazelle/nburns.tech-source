// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nathan\'s Blog',
  tagline: '"One lives not just for oneself, but for one\'s community" - RBG',
  url: 'https://nburns.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'albinogazelle', // Usually your GitHub org/user name.
  projectName: 'albinogazelle.github.io', // Usually your repo name.
  deploymentBranch: 'main',
  trailingSlash: false,

  plugins: [
    [
        "@docusaurus/plugin-client-redirects",
        {
          redirects: [
            {
              from: ["/Docs"],
              to: "/docs/welcome",
            },
/*             {
                from: ["/resume"],
                to: "/static/resume.pdf"
            } */
          ],
        },
      ],
    // ... Your other plugins.
    [
        
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en"],
        // ```
        // When applying `zh` in language, please install `nodejieba` in your project.
      },
      
    ],
    'plugin-image-zoom',
  ],
  

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          // Please change this to your repo.
          //editUrl: 'https://github.com/albinogazelle/nburns.tech-source/my-website/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          //editUrl:
            //'https://github.com/albinogazelle/nburns.tech-source/my-website/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
            trackingID: 'G-W0WFTF9FQH',
            anonymizeIP: true,
          },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    
    ({
        image: 'img/pp.png',
        hideableSidebar: true,
        colorMode: {
            defaultMode: 'dark',
        },
        metadata: [{name: 'keywords', content: 'cybersecurity, blog, tryhackme, hackthebox, books, hacker, IT, information technology, walkthroughs, tutorials'}],
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Home Logo',
          src: 'img/dice.svg',
        },
        
        items: [
          {
            type: 'doc',
            docId: 'welcome',
            position: 'left',
            label: 'Docs',
            collapsible: true,
          },
          
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/about_me', label: 'About Me', position: 'left'},
          /* {
            href: 'https://www.linkedin.com/in/nathan-burns-3613351b5/',
            className: 'linkedin-link',
            'aria-label': 'linkedin',
            position: 'right',
          }, 
          {
            href: 'mailto:nathan@nburns.tech',
            className: 'email-link',
            'aria-label': 'email',
            position: 'right',
          }, 
          {
            href: 'https://github.com/AlbinoGazelle',
            className: 'github-link',
            'aria-label': 'github',
            position: 'right',
          },  */
        ],
      },
      footer: {
        //commented out so override in custom.css works
        //style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorials',
                to: '/docs/Tutorials/intro',
              },
              {
                  label : 'HackTheBox Writeups',
                  to: '/docs/hackthebox/intro'
              },
              {
                  label: 'TryHackMe Notes',
                  to: '/docs/tryhackme/intro'
              }
            ],
          },
          {
            title: 'Projects',
            items: [
              {
                label: 'ToolBox',
                href: 'https://github.com/AlbinoGazelle/ToolBox'
            },
            {
                label: 'nburns.tech',
                href: 'https://github.com/AlbinoGazelle/nburns.tech-source'
            },
            {
               label: 'VNCExplore',
               href: 'https://github.com/AlbinoGazelle/VNCExplore' 
            }
            ],
          },
          {
            title: 'More',
            items: [
                {
                    label: 'Contact',
                    to: '/contact',
                },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                  label: 'GitHub',
                  to: 'https://github.com/AlbinoGazelle'
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nathan Burns. Built with Docusaurus.`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),
};

module.exports = config;
