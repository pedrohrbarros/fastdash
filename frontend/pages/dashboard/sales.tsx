import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { hasCookie } from 'cookies-next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from "next-i18next";

function Sales() {

  const { t } = useTranslation('sales')

  useEffect(() => {
    if (hasCookie('authorization') === false) {
      window.location.replace('/')
    }
  }, [])

  return (
    <body className="w-full h-full min-h-screen bg-gray-100 flex flex-row flex-nowrap">
      <aside>
        <Sidebar/>
      </aside>
      <main className="w-full h-full">
        <header className="w-full h-auto flex flex-row justify-end items-center">
          <Navbar/>
        </header>
      </main>
    </body>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar", "sales"])),
      // Will be passed to the page component as props
    },
  };
}

export default Sales