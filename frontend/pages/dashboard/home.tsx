import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { hasCookie } from 'cookies-next'
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Card from '@/components/Card';
import { useTranslation } from 'next-i18next';
import { calculateTotalRevenue } from '@/helpers/calculateTotalRevenue';
import { calculateTotalSellers } from '@/helpers/calculateTotalSellers';
import { calculateTotalProducts } from '@/helpers/calculateTotalProducts';
import Loader from '@/components/Loader';
import RevenuePerSellerGraph from '@/components/Graphs/RevenuePerSeller';
import History from './../../components/Log/History';
import RevenuePerLocationGraph from '@/components/Graphs/RevenuePerLocation';

function Home() {
  const router = useRouter();
  const { t } = useTranslation('home')
  
  const [total_revenue, setTotalRevenue] = useState<number>()
  const [total_revenue_percentage, setTotalRevenuePercentage] = useState<number>()

  const [total_sellers, setTotalSellers] = useState<number>()
  const [total_sellers_percentage, setTotalSellersPercentage] = useState<number>()

  const [total_products, setTotalProducts] = useState<number>()
  const [total_products_percentage, setTotalProductsPercentage] = useState<number>()
  

  useEffect(() => {
    if (hasCookie('authorization') === false){
      router.push('/')
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const revenueData: {total_revenue: number, total_revenue_percentage: number} | string = await calculateTotalRevenue()
      const sellersData: {total_sellers: number, total_sellers_percentage: number} | string = await calculateTotalSellers()
      const productsData: {total_products: number, total_products_percentage: number} | string = await calculateTotalProducts()
      if (typeof revenueData === 'string') {
        const message: string = revenueData
        alert(t(message))
      } else if (typeof sellersData === 'string') {
        const message: string = sellersData
        alert(t(message))
      } else if (typeof productsData === 'string') {
        const message: string = productsData
        alert(t(message))
      } else {
        setTotalRevenue(revenueData.total_revenue)
        setTotalRevenuePercentage(revenueData.total_revenue_percentage)
        setTotalSellers(sellersData.total_sellers)
        setTotalSellersPercentage(sellersData.total_sellers_percentage)
        setTotalProducts(productsData.total_products)
        setTotalProductsPercentage(productsData.total_products_percentage)
      }
    }
    fetchData()
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
        <section className="w-full h-full p-4 flex flex-row justify-center gap-2 items-center flex-wrap">
          <Card
          gross_value={total_revenue === undefined ? <Loader/> : `${total_revenue} R$`}
          title={t('Total Revenue')}
          percentage={total_revenue_percentage}
          />
          <Card
          gross_value={total_sellers === undefined ? <Loader/> : `${total_sellers}`}
          title={t('Total Sellers')}
          percentage={total_sellers_percentage}
          />
          <Card
          gross_value={total_products === undefined ? <Loader/> : `${total_products}`}
          title={t('Total Products')}
          percentage={total_products_percentage}
          />
        </section>
        <div className="w-full h-full p-4 flex flex-row justify-center items-center">
          <section className="w-full h-[60vh] p-4 bg-white rounded-lg flex flex-row justify-center items-center gap-2 flex-wrap max-[1666px]:w-[85vw]">
            <RevenuePerSellerGraph/>
          </section>
        </div>
        <section className="w-full h-full p-4 flex flex-row justify-center items-center gap-6 flex-nowrap max-[1365px]:flex-wrap">
          <History/>
          <RevenuePerLocationGraph/>
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