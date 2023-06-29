import React from 'react'
import { useTranslation } from "next-i18next";
import { userStore } from "../../hooks/userState";
import { ChangeEvent, useState, useEffect } from "react";
import { motion } from 'framer-motion'
import { CgNametag } from 'react-icons/cg'
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai'
import Image from 'next/image'
import userIcon from '@/assets/user-icon.png'
import { updateUser } from '@/services/user/update';
import Button from '../Button';

function Update() {
  const { t } = useTranslation('config')
  const firstname = userStore((state) => state.firstname)
  const [newFirstName, setNewFirstName] = useState('')
  const lastname = userStore((state) => state.lastname)
  const email = userStore((state) => state.email)
  const password = userStore((state) => state.password)
  const phone = userStore((state) => state.phone)
  const setFirstName = userStore((state) => state.setFirstName)
  const setLastName = userStore((state) => state.setLastName)
  const setEmail = userStore((state) => state.setEmail)
  const setPassword = userStore((state) => state.setPassword)
  const setPhone = userStore((state) => state.setPhone)
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    setNewFirstName(firstname)
  }, [firstname])

  const handleSubmit = async (): Promise<void> => {
    setIsEditable(false)
    if(newFirstName !== firstname) {
      const response: string = await updateUser({
        firstname: newFirstName
      })
      setFirstName(newFirstName)
      alert(t(response))
    }
  }

  return (
    <form
      id="update"
      name="update"
      autoComplete="on"
      className="w-full h-full p-4 max-[500px]:p-2 flex flex-col justify-center items-center gap-4"
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
      key={firstname}
      >
        <Image
        src={userIcon}
        alt="User Icon"
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
        <input
        type="text"
        id="firstname"
        value={newFirstName}
        className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setNewFirstName(event.target.value)}
        />
        : 
        <div className="w-[300px] max-w-[300px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium">{t('First Name')}</h2>
          <p className="font-p text-black text-2xl font-extralight">{newFirstName}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <div>
        <Button
        text={t('Save')}
        color="bg-[#581c87]"
        onClick={() => handleSubmit()}
        />
      </div>
    </form>
  )
}

export default Update