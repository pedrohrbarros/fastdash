import { ChangeEvent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Loader from '../Loader'
import { Seller } from '@/entities/seller'
import { getAllSellers } from '@/services/seller/getAll'
import Button from '../Button'
import { useRouter } from 'next/router'
import { createSeller } from '@/services/seller/create'

function SellersPanel() {
  const { t } = useTranslation("models");
  const router = useRouter()
  const [sellers, setSellers] = useState<Seller[]>([])

  const [name, setName] = useState<string>()
  const [age, setAge] = useState<number>()
  const [location, setLocation] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      const data: Seller[] | string = await getAllSellers()
      if (typeof data === 'string') {
        const message = data
        alert(t(message))
      } else {
        setSellers(data)
      }
    }
    fetchData()
  }, [sellers])

  const handleSubmit = async () => {
    if (name === null || name === '' || age === undefined || age === 0 || location === null || location === '' || name === undefined || location === undefined) {
      alert(t('Please fill in all fields'))
    } else {
      alert(t(await createSeller({
        name: name,
        age: age,
        location: location
      })))
      setName('')
      setAge(0)
      setLocation('')
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
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">ID</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">{t('Name')}</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">{t('Age')}</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6 pr-4">{t('Location')}</th>
        </tr>
      </thead>
      {
        sellers.map((seller: Seller, index) => (
          <tr key ={index} className="text-center cursor-pointer transition-all align-middle duration-500 hover:bg-gray-200" onClick={() => router.push(`seller/${seller.id !== 0 ? seller.id : null}`)}>
            <td className="text-center pb-4 ">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {seller.id ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {seller.name ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {seller.age ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {seller.location ?? <Loader/>}
              </p>
            </td>
          </tr>
        ))
      }
      <tr className="align-middle text-center">
        <td className="text-center pb-4 pl-4">
          <Button
          text={t('Add')}
          color="bg-gradient-to-r from-red-200 to-red-600"
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
            type="text"
            id="name"
            value={name}
            className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
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
              duration: 0.4,
            }}
            type="number"
            id="age"
            value={age}
            className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setAge(+event.target.value)
            }
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
              duration: 0.5,
            }}
            type="text"
            id="location"
            value={location}
            className="w-full outline-none font-p text-black text-xl max-[500px]:text-base border-b-[1px] border-b-black text-center"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setLocation(event.target.value)
            }
          />
        </td>
      </tr>
    </motion.table>
  )
}

export default SellersPanel;
