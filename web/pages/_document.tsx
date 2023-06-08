import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Light Theme */}
        <link rel="icon" href="/favicon/dark/favicon.ico" media="(prefers-color-scheme: light)" />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/dark/apple-touch-icon.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/dark/favicon-32x32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/dark/favicon-16x16.png"
          media="(prefers-color-scheme: light)"
        />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Dark Theme */}
        <link rel="icon" href="/favicon/light/favicon.ico" media="(prefers-color-scheme: dark)" />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/light/apple-touch-icon.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/light/favicon-32x32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/light/favicon-16x16.png"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />

        <link
          rel="preload"
          href="/fonts/Unbounded-ExtraLight.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-ExtraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Unbounded-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <meta name="title" content="Diamond Clicker" />
        <meta
          name="description"
          content="There is only one way to become a diamond hand. Click, click, click."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://diamondclicker.com/" />
        <meta property="og:title" content="Diamond Clicker" />
        <meta
          property="og:description"
          content="There is only one way to become a diamond hand. Click, click, click."
        />
        <meta property="og:image" content="https://diamondclicker.com/twitter-card.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://diamondclicker.com/" />
        <meta property="twitter:title" content="Diamond Clicker" />
        <meta
          property="twitter:description"
          content="There is only one way to become a diamond hand. Click, click, click."
        />
        <meta property="twitter:image" content="https://diamondclicker.com/twitter-card.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
