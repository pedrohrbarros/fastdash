import { Product } from "@/entities/product";
import { Sale } from "@/entities/sale";
import { Seller } from "@/entities/seller";
import { createSale } from "@/services/sale/create";
import { getAllSales } from "@/services/sale/getAll";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import Button from "../Button";
import { getAll } from "@/services/product/getAll";
import { getAllSellers } from "@/services/seller/getAll";
import Loader from "../Loader";

export default function SalesPanel() {
  const { t } = useTranslation('comercial')
  const router = useRouter()
  const [sales, setSales] = useState<Sale[]>()
  const [products, setProducts] = useState<Product[]>()
  const [sellers, setSellers] = useState<Seller[]>()

  const [product, setProduct] = useState<string | null>()
  const [seller, setSeller] = useState<string | null>()
  const [sold_at, setSoldAt] = useState<string | null>()

  useEffect(() => {
    const fetchData = async () => {
      const salesData: Sale[] | string = await getAllSales()
      const productsData: Product[] | string = await getAll()
      const sellersData: Seller[] | string = await getAllSellers()
      if (typeof salesData === 'string') {
        const message: string = salesData
        alert(t(message))
      } else if (typeof productsData === 'string'){
        const message: string = productsData
        alert(t(message))
      } else if (typeof sellersData === 'string'){
        const message: string = sellersData
        alert(t(message))
      } else {
        const sales: Sale[] = salesData
        const products: Product[] = productsData
        const sellers: Seller[] = sellersData
        setSales(sales)
        setProducts(products)
        setSellers(sellers)
      }
    }
    fetchData()
  }, [sales])

  const handleSubmit = async () => {
    if (product === undefined || product === null || seller === undefined || seller === null || sold_at === undefined || sold_at === null || product === '' || seller === '') {
      alert(t('Please fill in all fields'))
    } else {
      alert(t(await createSale({
        product: product,
        seller:seller,
        sold_at: sold_at
      })))
      setProduct(null)
      setSeller(null)
      setSoldAt(null)
    }
  }

  return (
    <motion.table
    initial={{
      x: -500,
    }}
    animate = {{
      x: 0,
    }}
    exit = {{
      x: 500
    }}
    className="w-full h-full"
    >
      <thead>
        <tr>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">
            ID
          </th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">
            {t('Product')}
          </th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">
            {t('Seller')}
          </th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">
            {t('Sold at')}(R$)
          </th>
        </tr>
        {
          sales?.map((sale, index) => (
            <tr
            key={index}
            className="cursor-pointer transition-all align-middle duration-500 hover:bg-gray-200"
            onClick={() =>
              router.push(`sale/${sale.id !== 0 ? sale.id : null}/`)
            }
          >
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">
                {sale.id ?? <Loader />}
              </p>
            </td>
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">
                {sale.product ?? <Loader />}
              </p>
            </td>
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">
                {sale.seller ?? <Loader />}
              </p>
            </td>
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">
                {sale.sold_at ?? <Loader />} R$
              </p>
            </td>
          </tr>
          ))
        }
        <tr className="align-middle text-center">
          <td className="text-center pb-4 pl-4">
            <Button
            text={t('Add')}
            color="bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800"
            onClick={() => handleSubmit()}
            />
          </td>
          <td className="text-center pb-4 pl-4">
            <motion.select
              initial={{
                width: 0,
              }}
              animate={{
                width: "100%",
              }}
              exit={{
                width: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              id="products"
              name="products"
              value={product ?? ''}
              className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center font-light min-w-[200px]"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setProduct(event.target.value)}
            >
              <option value='' disabled selected>{t('Select a product')}</option>
              {
                products?.map((product: Product, index) => (
                  <option key={index} value={product.name} className="text-black font-light font-p text-xl">{product.name}</option>
                ))
              }
            </motion.select>
          </td>
          <td className="text-center pb-4 pl-4">
            <motion.select
              initial={{
                width: 0,
              }}
              animate={{
                width: "100%",
              }}
              exit={{
                width: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              id="sellers"
              name="sellers"
              value={seller ?? ''}
              className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center min-w-[150px]"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setSeller(event.target.value)}
            >
              <option value='' disabled selected>{t('Select a seller')}</option>
              {
                sellers?.map((seller: Seller, index) => (
                  <option key={index} value={seller.name} className="text-black font-light font-p text-xl">
                    {seller.name}
                  </option>
                ))
              }
            </motion.select>
          </td>
          <td className="text-center pb-4 pl-4">
            <motion.input
              initial={{
                width: 0,
              }}
              animate={{
                width: "100%",
              }}
              exit={{
                width: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              type = "text"
              id="sold_at"
              name="sold_at"
              value={sold_at ?? ''}
              className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center min-w-[100px]"
              onChange= {(event: ChangeEvent<HTMLInputElement>) => {
                setSoldAt(event.target.value)
              }}
            />
          </td>
        </tr>
      </thead>
      
    </motion.table>
  )
}