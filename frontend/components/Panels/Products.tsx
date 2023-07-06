import React, { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Button from '../Button'
import { productStore } from '@/hooks/productState'
import Loader from '../Loader'
import { Product } from '@/entities/product'
import { BiError } from 'react-icons/bi'
import { createProduct } from '@/services/products/create'

function ProductsPanel() {

  const { t } = useTranslation('comercial')

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
            className="w-full outline-none font-p text-black text-xl max-[500px]:text-sm border-b-[1px] border-b-black text-center"
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
      {renderAddInput()}
      {addInputActive === false ? <tfoot>
        <td className="w-3 max-[500px]:w-1">
          <Button
          color="bg-purple-900"
          text='+'
          onClick={() => setAddInputActive(true)}
          />
        </td>
      </tfoot> : null}
    </motion.table>
  )
}

export default ProductsPanel
