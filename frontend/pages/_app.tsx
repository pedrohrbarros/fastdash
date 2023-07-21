import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { useState } from 'react'
import Loader from '../components/Loader'

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)

  setTimeout(() => setLoading(false), 1000)
  if (loading) {
    return (
      <div
        className="w-full h-screen flex flex-col justify-center items-center bg-jet"
      >
        <Loader/>
      </div>
    )
  }
  else {
    return (
      <>
        <Head>
          <title>FastDash</title>
          <link rel = "shortcut icon" href="/favicon.ico"/>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default appWithTranslation(App)