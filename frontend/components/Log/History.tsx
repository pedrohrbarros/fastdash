import { useTranslation } from "next-i18next"
import { Log } from './../../entities/log';
import { useEffect, useState } from "react";
import { getAllLogs } from "@/services/log/getAll";
import { motion } from 'framer-motion'
import { AiOutlineDelete } from "react-icons/ai";
import { GrUpdate, GrStatusUnknown } from 'react-icons/gr'
import { IoCreateOutline } from 'react-icons/io5'
import { User } from "@/entities/user";
import { getAllUsers } from "@/services/user/getAll";
import Loader from "../Loader";

function History() {

  const { t } = useTranslation('home')
  const [logs, setLogs] = useState<Log[]>()
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    const fetchData = async () => {
      const logData: Log[] | string = await getAllLogs()
      const userData: User[] | string = await getAllUsers()
      if (typeof logData === 'string'){
        const message: string = logData
        alert(t(message))
      } else if (typeof userData === 'string') {
        const message: string = userData
        alert(t(message))
      } else {
        setLogs(logData)
        setUsers(userData)
      }
    }
    fetchData()
  }, [])

  const setActionIcon = (action: string) => {
    if (action.split(' ')[0] === 'remove') {
      return <AiOutlineDelete size={30} color="#eb4034"/>
    } else if (action.split(' ')[0] === 'update') {
      return <GrUpdate size={30} color="#00ffff"/>
    } else if (action.split(' ')[0] === 'create'){
      return <IoCreateOutline size={30} color="#00ff40"/>
    } else {
      return <GrStatusUnknown size={30}/>
    }
  }

  const setActionText = (action: string, user_id: number) => {
    if (action.split(' ')[0] === 'remove') {
      return (
        <p className="font-p text-black text-base">
          {
            users?.map((user: User) => (
              user_id === +user.id ? user.firstname : null
            ))
          }
          &nbsp;
          {t(action)}
        </p>
      )
    } else if (action.split(' ')[0] === 'update') {
      return (
          <p className="font-p text-black text-base">
            {
              users?.map((user: User) => (
                user_id === +user.id ? user.firstname : null
              ))
            }
            &nbsp;
            {t(action)}
          </p>
      )
    } else if (action.split(' ')[0] === 'create'){
      return (
        <p className="font-p text-black text-base">
          {
            users?.map((user: User) => (
              user_id === +user.id ? user.firstname : null
            ))
          }
          &nbsp;
          {t(action)}
        </p>
      )
    } else {
      return (
        <p className="font-p text-black text-base">
          {
            users?.map((user: User) => (
              user_id === +user.id ? user.firstname : null
            ))
          }
          &nbsp;
          {t(action)}
        </p>
      )
    }
  }

  return (
    <ul className="list-none w-[400px] h-[60vh] overflow-y-scroll overflow-x-scroll bg-white rounded-lg p-2 flex flex-col justify-start items-center text-center gap-3 max-[500px]:w-full">
      <h1 className="font-h1 text-black text-2xl">{t('Log History')}</h1>
      {
        logs !== undefined ?
        logs?.slice(logs.length -20, logs.length).reverse().map((log: Log, index: number) => (
          <motion.li
          key={index} 
          className="w-full h-full flex flex-row flex-nowrap justify-start items-start gap-2"
          initial={{
            x: -300,
            opacity: 0
          }}
          animate = {{
            x: 0,
            opacity: 1
          }}
          transition={{
            duration: index / 10,
          }}
          >
            {setActionIcon(log.action)}
            {setActionText(log.action, log.user_id)}
          </motion.li>
        ))
        :
        <Loader/>
      }
    </ul>
  )
}

export default History