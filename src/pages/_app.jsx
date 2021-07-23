/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
