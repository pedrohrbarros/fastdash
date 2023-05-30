import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'

function App({ Component, pageProps }: AppProps) {

  function Loading(){
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    setTimeout(() => setLoading(false), 1000)

    useEffect(() => {
      const handleStart = (url: string) => (url !== router.asPath) && setLoading(true)
      const handleComplete = (url: string) => (url === router.asPath) && setLoading(false)

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
        router.events.off('routeChangeStart', handleStart)
        router.events.off('routeChangeComplete', handleComplete)
        router.events.off('routeChangeError', handleComplete)
      }
    })
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
      return null
    }
  }

  return (
    <>
      <Head>
        <title>FastDash</title>
      </Head>
      <Loading/>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(App)