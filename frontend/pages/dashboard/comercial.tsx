import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { hasCookie } from 'cookies-next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from "next-i18next";
import SalesPanel from '@/components/Panels/Sales';
import ProductsPanel from '@/components/Panels/Products';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

function Comercial() {

  const { t } = useTranslation('comercial')

  useEffect(() => {
    if (hasCookie('authorization') === false) {
      window.location.replace('/')
    }
  }, [])

  const [panelState, setPanelstate] = useState<'sales' | 'products'>('sales')

  const renderPanel = () => {
    if(panelState === 'sales') {
      return <SalesPanel/>
    } else if (panelState === 'products') {
      return <ProductsPanel/>
    }
  }

  return (
    <body className="w-full h-full min-h-screen bg-gray-100 flex flex-row flex-nowrap">
      <aside>
        <Sidebar/>
      </aside>
      <main className="w-full h-full min-h-screen">
        <header className="w-full h-auto flex flex-row justify-end items-center">
          <Navbar/>
        </header>
        <section className="w-full h-full flex flex-col justify-start items-start p-6 gap-5 max-[500px]:p-3">
          <h1 className="font-h1 text-black text-3xl max-[500px]:text-2xl">{t(panelState.charAt(0).toUpperCase() + panelState.slice(1))}</h1>
          <article className="bg-white p-4 rounded-lg w-full h-full flex flex-row justify-between items-center gap-2 flex-nowrap max-[500px]:p-2 overflow-x-scroll">
            <div className="h-full bg-gray-400 rounded-lg p-2 cursor-pointer max-[500px]:p-1" onClick={() => setPanelstate(panelState === 'sales' ? 'products' : 'sales')}>
              <AiOutlineArrowLeft className="w-auto h-8 max-[500px]:h-5"/>
            </div>
            {renderPanel()}
            <div className="h-full bg-gray-400 rounded-lg p-2 cursor-pointer max-[500px]:p-1" onClick={() => setPanelstate(panelState === 'sales' ? 'products' : 'sales')}>
              <AiOutlineArrowRight className="w-auto h-8 max-[500px]:h-5"/>
            </div>
          </article>
        </section>
      </main>
    </body>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar", "comercial"])),
      // Will be passed to the page component as props
    },
  };
}

export default Comercial