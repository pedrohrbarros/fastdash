import React, { ChangeEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Button from '../Button'
import { productStore } from '@/hooks/productState'
import Loader from '../Loader'
import { createProduct } from '@/services/products/create'
import { getAll } from '@/services/products/getAll'
import { Product } from '@/entities/product'
import { useRouter } from 'next/router'

function ProductsPanel() {

  const { t } = useTranslation('comercial')

  const router = useRouter();
  const [addInputActive, setAddInputActive] = useState(false)
  const name = productStore((state) => state.name)
  const price = productStore((state) => state.price)
  const setName = productStore((state) => state.setName)
  const setPrice = productStore((state) => state.setPrice)
  const [loader, setLoader] = useState(false)

  const handleSubmit = async () => {
    if (name === '' || name === null) {
      alert(t('Minimun length to the name: 1'))
    } else if (price <= 0) {
      alert(t('Price must be greater than 0'))
    } else {
      setLoader(true)
      const response: boolean | string = await createProduct({
        name: name,
        price: price
      })
      if (response === true) {
        alert(t('Product created successfully'))
        setName("")
        setPrice(0)
        setLoader(false)
        setAddInputActive(false)
      } else {
        alert(t(response.toString()))
      }
    }
  }

  const renderAddInput = () => {
    if (addInputActive) {
      return (
        <tr>
          <td className="pb-6 px-10 max-[500px]:px-2">
            <motion.input
            initial={{
              width: 0
            }}
            animate={{
              width: '100%'
            }}
            exit={{
              width: 0
            }}
            transition={{
              duration: 0.3
            }}
            type="text"
            id="name"
            value={name}
            className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
            onChange= {(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            />
          </td>
          <td className="pb-6 px-10 max-[500px]:px-2">
          <motion.input
            initial={{
              width: 0
            }}
            animate={{
              width: '100%'
            }}
            exit={{
              width: 0
            }}
            transition={{
              duration: 0.4
            }}
            type="number"
            id="price"
            value={price}
            className="w-full outline-none font-p text-black text-xl max-[500px]:text-sm border-b-[1px] border-b-black text-center"
            onChange= {(event: ChangeEvent<HTMLInputElement>) => setPrice(+event.target.value)}
            />
          </td>
          <td className="pb-6 pr-3 max-[500px]:pr-1">
            {loader === false ? <Button
            color="bg-purple-900"
            text={t('Add')}
            onClick={() => handleSubmit()}
            /> : <Loader/>}
          </td>
        </tr>
      )
    }
  }

  const [products, setProducts] = useState<Product[]>([{
    id: 0,
    name: name,
    price: price
  }])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll()
      if (typeof data === 'string') {
        alert(t(data))
      } else {
        setProducts(data)
      }
    }

    fetchData()
  }, [products])

  return (
    <motion.table
    initial={{
      x: -500,
    }}
    animate={{
      x: 0
    }}
    exit={{
      x:500
    }}
    className="w-full h-full"
    >
      <thead>
        <tr>
          {addInputActive === false ? <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">ID</th> : null}
          <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">{t('Name')}</th>
          <th className="font-p font-bold text-black text-xl max-[500px]:text-sm pb-6">{t('Price')}</th> 
        </tr>
      </thead>
      {
        products.map((product, index) => (
          <tr key={index} className="cursor-pointer transition-all align-middle duration-500 hover:bg-gray-200" onClick={() => router.push(`${product.id}/`)}>
            {addInputActive === false ? 
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">{product.id}</p>
            </td> : null}
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">{product.name}</p>
            </td>
            <td className="text-center pb-4">
              <p className="font-p text-black font-light text-xl max-[500px]:text-base">{product.price} R$</p>
            </td>
          </tr>
        ))
      }
      {renderAddInput()}
      {addInputActive === false ? <tfoot>
        <td className="w-3 max-[500px]:w-1">
          <Button
          color="bg-purple-900"
          text='+'
          onClick={() => setAddInputActive(!addInputActive)}
          />
        </td>
      </tfoot> : null}
    </motion.table>
  )
}

export default ProductsPanel
