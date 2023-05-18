import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FastDash</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(App)