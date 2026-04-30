import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#A8FF3E" />

        {/* Android PWA */}
        <meta name="mobile-web-app-capable" content="yes" />

        {/* iOS PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FitPro" />

        {/* Icons */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

        {/* SEO */}
        <meta name="description" content="FitPro — AI-powered fitness platform with personalized workouts and nutrition for every body and goal." />
        <meta name="keywords" content="fitness app, workout, nutrition, weight loss, muscle gain, HIIT, SaaS" />
        <meta property="og:title" content="FitPro — Your Body, Redefined." />
        <meta property="og:description" content="Personalized workouts, smart nutrition, real progress." />
        <meta property="og:type" content="website" />

        {/* Fonts are loaded in-component via @import */}
      </Head>
      <body style={{ margin: 0, padding: 0, background: "#060912" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
