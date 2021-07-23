import React from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import DailySaint from '../components/domain/synaxarion/DailySaint';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Synaxis Holy Quotes App</title>
        <meta
          name='description'
          content='An App For Eastern Orthodox Christians'
        />
        <link rel='icon' href='/images/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>The Synaxis Holy Quotes App</h1>

        <p className={styles.description}>
          An App For Eastern Orthodox Christians
        </p>
        <DailySaint />
      </main>
    </div>
  );
}
