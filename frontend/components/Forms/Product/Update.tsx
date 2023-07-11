import React from 'react'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import { ChangeEvent, useState, useEffect } from "react";
import { motion } from 'framer-motion'
import { CgNametag } from 'react-icons/cg'
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai'
import { ImPriceTag } from 'react-icons/im'
import Image from 'next/image'
import productIcon from '@/assets/product-icon.png'
import Button from '../../Button';
import { productStore } from '@/hooks/productState';
import { updateProduct } from '@/services/products/update';
import { deleteProduct } from '@/services/products/delete';

function Update() {

  const { t } = useTranslation('comercial')
  const router = useRouter();
  const id = router.query.product

  const name = productStore((state) => state.name)
  const setName = productStore((state) => state.setName)
  const setPrice = productStore((state) => state.setPrice)
  const [newName, setNewName] = useState('')
  const price = productStore((state) => state.price)
  const [newPrice, setNewPrice] = useState(0)
  const [isEditable, setIsEditable] = useState(false)
  const [nameMessage, displayNameMessage] = useState('')
  const [priceMessage, displayPriceMessage] = useState('')

  useEffect(() => {
    setNewName(name)
    setNewPrice(price)
  }, [name, price])

  const handleSubmit = async (): Promise<void> => {
    setIsEditable(false)
    if(newName !== name){
      const response: string = await updateProduct({
        name: newName
      }, id !== undefined ? +id : 0) 
      setName(name)
      displayNameMessage(response)
    } 
    if (newPrice !== price && newPrice > 0) {
      const response: string = await updateProduct({
        price: +newPrice
      }, id !== undefined ? +id : 0)
      setPrice(+price)
      displayPriceMessage(response)
    } 
    if (newPrice!== price && newPrice <= 0) {
      displayPriceMessage('Price must be greater than 0')
    }
  }

  const handleDelete = async () => {
    setName('')
    setPrice(0)
    const response: string = await deleteProduct(id !== undefined ? +id : 0)
    if (response === 'Product deleted successfully'){
      alert(t('Product deleted successfully'))
      router.push('/dashboard/comercial')
    } else {
      alert(t(response))
    }
  }

  return (
    <form
    id="update"
    name="update"
    autoComplete="on"
    className="w-full h-full p-4 max-[500px]:p-2 flex flex-col justify-center items-center gap-10"
    >
      <motion.div className="w-auto h-auto rounded-[50%]"
      animate = {{
        rotateY: 180
      }}
      transition = {{
        type:"spring",
        duration: 0.8,
        delay: 0.5,
      }}
      key={name || price}
      >
        <Image
        src={productIcon}
        alt="Product Icon"
        width={170}
        height={170}
        />
      </motion.div>
      <fieldset
        className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap"
      >
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <CgNametag size={30}/>
        </div>
        {isEditable ?
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="text"
          id="name"
          value={newName}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewName(event.target.value)}
          />
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('Name')}</h2>
          <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">{newName}</p>
          <p className={`font-p text-xl ${nameMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(nameMessage)}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <fieldset
        className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap"
      >
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <ImPriceTag size={30}/>
        </div>
        {isEditable ?
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="number"
          id="price"
          value={newPrice}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPrice(+event.target.value)}
          />
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('Price')}</h2>
          <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">{newPrice}</p>
          <p className={`font-p text-xl ${priceMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(priceMessage)}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <div className="w-auto h-auto flex flex-col gap-6">
        <Button
        text={t('Save')}
        color="bg-[#581c87]"
        onClick={() => handleSubmit()}
        />
        <Button
        text={t('Delete Product')}
        color="bg-red-600"
        onClick={() => handleDelete()}
        />
      </div>
    </form>
  )
}

export default Update