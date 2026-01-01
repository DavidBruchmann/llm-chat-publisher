import React from 'react';
import Layout from '@theme/Layout';
import HomepageCards from '@site/src/components/HomepageCards';

export default function Home() {
  return (
    <Layout title="Q&A Knowledge Base" description="Real questions. Structured answers.">
      <main>
        <section style={{ textAlign: 'center', margin: '3rem 0' }}>
          <h1>Q&A Knowledge Base</h1>
          <p>Real questions. Structured answers.</p>
        </section>

        <HomepageCards />
      </main>
    </Layout>
  );
}
