import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Layout.module.scss';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link href='/'>The Synaxis</Link>
        </h1>
      </header>
    </>
  );
}
