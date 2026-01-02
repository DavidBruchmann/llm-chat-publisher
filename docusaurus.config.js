import { themes as prismThemes } from 'prism-react-renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';

export default {
  title: 'Q&A Knowledge Base',
  tagline: 'Real questions. Structured answers.',
  url: 'https://davidbruchmann.github.io',
  baseUrl: '/llm-chat-publisher/',
  organizationName: 'DavidBruchmann',
  projectName: 'llm-chat-publisher',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          exclude: ['/index'], // 👈 exclude landing page
        },
        theme: {
          customCss: path.resolve(__dirname, 'src/scss/custom.scss'),
        }
      }
    ]
  ],
  themeConfig: {
    // announcementBar: {
      // id: support_us,
      // content: "Support us"
    // },
    navbar: {
      // title: 'Q&A',
      logo: {
        alt: 'Q&A Knowledge Base',
        src: 'img/logo.svg',
        href: '/', // optional, but fine
      },
      items: [
        /*
        { to: 'qa', label: 'Q&A', position: 'left' },
        { to: '/docs/topics', label: 'Topics', position: 'left' },
        { to: '/docs/documentation', label: 'Documentation', position: 'left' },
        */

        {
          to: '/',
          // label: 'Home',
          position: 'left',
          title: 'Home',
          className: 'navbar__item--home',
          'aria-label': 'Home',
        },
        {
          to: '/qa/',
          label: 'Q&A',
          title: 'Question and Answer',
          position: 'left'
        },
        {
          to: '/topics/',
          label: 'Topics',
          position: 'left'
        },
        {
          to: '/documentation',
          label: 'Documentation',
          position: 'left'
        },
        {
          href: 'https://ko-fi.com/davidbruchmann',
          // label: 'Support me on Ko-Fi',
          position: 'right',
          className: 'navbar__item--kofi',
          'aria-label': 'Support this project on Ko-fi',
        }

      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  }
};
