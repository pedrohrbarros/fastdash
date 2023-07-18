import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { hasCookie } from 'cookies-next'
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Card from '@/components/Card';
import { useTranslation } from 'next-i18next';

function Home() {
  const router = useRouter();
  const { t } = useTranslation()

  useEffect(() => {
    if (hasCookie('authorization') === false){
      router.push('/')
    }
  })

  return (
    <body className="w-full h-full min-h-screen bg-gray-100 flex flex-row flex-nowrap">
      <aside>
        <Sidebar/>
      </aside>
      <main className="w-full h-full">
        <header className="w-full h-auto flex flex-row justify-end items-center">
          <Navbar/>
        </header>
        <section className="w-full h-full p-4 flex flex-row justify-center gap-2 items-center flex-wrap">
          <Card
          gross_value="7,846"
          title={t('Total Revenue')}
          percentage={-10}
          />
          <Card
          gross_value="7,846"
          title={t('Daily Revenue')}
          percentage={-10}
          />
          <Card
          gross_value="7,846"
          title={t('Daily Revenue')}
          percentage={-10}
          />
        </section>
        <section className="w-full h-full p-4 bg-white">

        </section>
      </main>
    </body>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar", "home"])),
      // Will be passed to the page component as props
    },
  };
}

export default Home