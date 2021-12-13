// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nathan\'s Website',
  tagline: 'Welcome',
  url: 'https://albinogazelle.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'albinogazelle', // Usually your GitHub org/user name.
  projectName: 'albinogazelle.github.io', // Usually your repo name.
  deploymentBranch: 'main',
  trailingSlash: false,
  plugins: [
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
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        colorMode: {
            defaultMode: 'dark',
        },
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
          },
          
          {to: '/blog', label: 'Blog', position: 'left'},
          /* {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
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
                label: 'Docs and Tutorials',
                to: '/docs/welcome',
              },
            ],
          },
          {
            title: 'Socials',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/AlbinoGazelle',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/nathan-burns-3613351b5/',
              },
              
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'WWU Cybersecurity Club',
                href: 'https://wwucyber.com',
              },
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
