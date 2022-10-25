import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const MyDocument: React.FC = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/Agrandir-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Agrandir-Narrow.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Agrandir-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Modius-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="/images/logo.png" />
        <Script src="js/jquery-2.2.1.min.js" strategy="beforeInteractive" />
        <Script src="js/blockrain.jquery.min.js" strategy="beforeInteractive" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
