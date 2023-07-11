import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Loader from '../Loader'
import { useRouter } from 'next/router'
import { User } from '@/entities/user'
import { getAllUsers } from '@/services/user/getAll'

function UsersPanel() {
  const { t } = useTranslation('models')
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data: User[] | string = await getAllUsers()
      if (typeof data === 'string') {
        const message = data
        alert(t(message))
      } else {
        setUsers(data)
      }
    }
    fetchData()
  }, [])

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
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6">ID</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6">{t('First Name')}</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6">{t('Last Name')}</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6">{t('E-mail Adress')}</th>
          <th className="font-p font-bold text-black text-xl max-[850px]:text-sm pb-6">{t('Phone')}</th>
        </tr>
      </thead>
      {
        users.map((user: User, index) => (
          <tr key ={index} className="align-middle text-center">
            <td className="text-center pb-4 ">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {user.id ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {user.firstname ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {user.lastname ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {user.email ?? <Loader/>}
              </p>
            </td>
            <td className="text-center pb-4 pl-4">
             <p className="font-p text-black font-light text-xl max-[850px]:text-base">
                {user.phone ?? <Loader/>}
              </p>
            </td>
          </tr>
        ))
      }
    </motion.table>
  )
}

export default UsersPanel