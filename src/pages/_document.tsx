import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="google-site-verification"
          content="i24iU-1pRkcrNji8sEZUTpCsoLueFJoXPaG5n-XiZ_I" // Google Search Console verification code
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/manifest/icon.png" />
        <meta name="theme-color" content="#424DFD" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
