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

export default function SalesPanel() {
  const { t } = useTranslation('comercial')
  const router = useRouter()
  const [sales, setSales] = useState<Sale[]>()
  const [products, setProducts] = useState<Product[]>()
  const [sellers, setSellers] = useState<Seller[]>()

  const [product, setProduct] = useState<string>()
  const [seller, setSeller] = useState<string>()
  const [sold_at, setSoldAt] = useState<string>()

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
    if (product === undefined || product === null || seller === undefined || seller === null || sold_at === undefined || sold_at === null) {
      alert(t('Please fill in all fields'))
    } else {
      alert(t(await createSale({
        product: product,
        seller:seller,
        sold_at: sold_at
      })))
      setProduct('')
      setSeller('')
      setSoldAt('')
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
            {t('Sold at')}
          </th>
        </tr>
        <tr className="align-middle text-center">
          <td className="text-center pb-4 pl-4">
            <Button
            text={t('Add')}
            color="bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800"
            onClick={() => handleSubmit()}
            />
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
                duration: 0.3,
              }}
              list = "products"
              id="products_choice"
              name="products_choice"
              className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setProduct(event.target.value)}
            />
            <datalist id="products">
              {
                products?.map((product: Product, index) => (
                  <option key={index} value={product.name}/>
                ))
              }
            </datalist>
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
              list = "sellers"
              id="sellers_choice"
              name="sellers"
              className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSeller(event.target.value)}
            />
            <datalist id="sellers">
              {
                sellers?.map((seller: Seller, index) => (
                  <option key={index} value={seller.name}/>
                ))
              }
            </datalist>
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
              className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
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