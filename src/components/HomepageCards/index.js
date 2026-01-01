// src/components/HomepageCards/index.js
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const cards = [
  {
    title: 'Q&A Knowledge Base',
    description:
      'Real questions, structured and reusable answers focused on practical web development and automation.',
    link: '/qa',
    icon: '💬',
  },
  {
    title: 'Technical Topics',
    description:
      'Standalone, curated technical articles derived from real-world questions and solutions.',
    link: '/topics',
    icon: '🧠',
  },
  {
    title: 'Documentation',
    description:
      'Developer and administration documentation explaining structure, workflows, and maintenance.',
    link: '/documentation',
    icon: '📘',
  },
  {
    title: 'Support the Project',
    description:
      'If this knowledge base helps you, consider supporting ongoing work and maintenance.',
    link: 'https://ko-fi.com/<your-name>',
    icon: '☕',
    external: true,
  },
];

function Card({ title, description, link, icon, external }) {
  const Wrapper = external ? 'a' : Link;
  const props = external
    ? {
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {
        to: link
      };

  return (
    <Wrapper className={styles.card} {...props}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Wrapper>
  );
}

export default function HomepageCards() {
  return (
    <section className={styles.grid}>
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </section>
  );
}
