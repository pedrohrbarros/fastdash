import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link href="/dist/output.css" rel="stylesheet"/>
        <meta name ="description" content="Interative full stack dashboard with automatic reporting."/>
        <link rel = "icon" href="/favicon.ico"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
