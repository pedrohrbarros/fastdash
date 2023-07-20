import React from 'react'
import { useTranslation } from "next-i18next";
import { userStore } from "../../../hooks/userState";
import { ChangeEvent, useState, useEffect } from "react";
import { motion } from 'framer-motion'
import { CgNametag, CgRename } from 'react-icons/cg'
import { AiOutlineEdit, AiOutlineCheck, AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { MdPassword } from 'react-icons/md'
import Image from 'next/image'
import userIcon from '@/assets/user-icon.png'
import { updateUser } from '@/services/user/update';
import Button from '../../Button';
import { BsPhone } from 'react-icons/bs';
import { passwordValidator } from '@/helpers/passwordValidator';
import { deleteCookie } from 'cookies-next';
import { deleteUser } from '@/services/user/delete';

function Update() {
  const { t } = useTranslation('config')

  const firstname = userStore((state) => state.firstname)
  const [newFirstName, setNewFirstName] = useState('')
  const lastname = userStore((state) => state.lastname)
  const [newLastName, setNewLastName] = useState('')
  const email = userStore((state) => state.email)
  const [newEmail, setNewEmail] = useState('')
  const password = userStore((state) => state.password)
  const [newPassword, setNewPassword] = useState('')
  const phone = userStore((state) => state.phone)
  const [newPhone, setNewPhone] = useState<string | undefined | null>()
  const setFirstName = userStore((state) => state.setFirstName)
  const setLastName = userStore((state) => state.setLastName)
  const setEmail = userStore((state) => state.setEmail)
  const setPassword = userStore((state) => state.setPassword)
  const setPhone = userStore((state) => state.setPhone)
  const [isEditable, setIsEditable] = useState(false)
  const [firstnameMessage, displayFirstnameMessage] = useState('')
  const [lastnameMessage, displayLastnameMessage] = useState('')
  const [emailMessage, displayEmailMessage] = useState('')
  const [passwordMessage, displayPasswordMessage] = useState('')
  const [phoneMessage, displayPhoneMessage] = useState('')

  const passwordScore = passwordValidator(newPassword)

  useEffect(() => {
    setNewFirstName(firstname)
    setNewLastName(lastname)
    setNewEmail(email)
    setNewPassword(password)
    setNewPhone(phone === undefined ? '' : phone)
  }, [firstname, lastname, email, password, phone])

  const handleSubmit = async (): Promise<void> => {
    setIsEditable(false)
    if(newFirstName !== firstname) {
      const response: string = await updateUser({
        firstname: newFirstName
      })
      setFirstName(newFirstName)
      displayFirstnameMessage(response)
    }
    if(newLastName !== lastname) {
      const response: string = await updateUser({
        lastname: newLastName
      })
      setLastName(newLastName)
      displayLastnameMessage(response)
    }
    if(newEmail !== email) {
      const response: string = await updateUser({
        email: newEmail
      })
      setEmail(email)
      displayEmailMessage(response)
    }
    if(newPassword !== password && passwordScore >= 13) {
      const response: string = await updateUser({
        password: newPassword
      })
      setPassword(newPassword)
      displayPasswordMessage(response)
    }
    if(newPhone !== phone) {
      const response: string = await updateUser({
        phone: newPhone
      })
      setPhone(newPhone || '')
      displayPhoneMessage(response)
    }
  }

  const handleExit = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPhone('')
    deleteCookie('authorization')
  }

  const handleDelete = async () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPhone('')
    const response: boolean | string = await deleteUser()
    if (response === true) {
      alert(t('User deleted successfully!'))
      window.location.replace('/')
      deleteCookie('authorization')
    } else {
      alert(t(response.toString()))
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
      key={firstname || lastname || email || password || phone}
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
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="text"
          id="firstname"
          value={newFirstName}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewFirstName(event.target.value)}
          />
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('First Name')}</h2>
          <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">{newFirstName}</p>
          <p className={`font-p text-xl ${firstnameMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(firstnameMessage)}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <fieldset
        className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap"
      >
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <CgRename size={30}/>
        </div>
        {isEditable ?
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="text"
          id="lastname"
          value={newLastName}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewLastName(event.target.value)}
          />
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('Last Name')}</h2>
          <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">{newLastName}</p>
          <p className={`font-p text-xl ${lastnameMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(lastnameMessage)}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <fieldset
        className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap"
      >
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <AiOutlineMail size={30}/>
        </div>
        {isEditable ?
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="text"
          id="email"
          value={newEmail}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewEmail(event.target.value)}
          />
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('E-mail Adress')}</h2>
          <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">{newEmail}</p>
          <p className={`font-p text-xl ${emailMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(emailMessage)}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <fieldset
        className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap"
      >
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <MdPassword size={30}/>
        </div>
        {isEditable ?
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="password"
          id="password"
          value={newPassword}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
          />
          <div className="w-full h-2 flex flex-row justify-center gap-2 items-center flex-nowrap">
          {passwordScore >= 4 ? (
            <div className="w-1/4 h-full bg-red-600 rounded transition-all duration-[350ms]" />
          ) : (
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]" />
          )}
          {passwordScore >= 7 ? (
            <div className="w-1/4 h-full bg-amber-400 rounded transition-all duration-[350ms]" />
          ) : (
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]" />
          )}
          {passwordScore > 13 ? (
            <div className="w-1/4 h-full bg-green-400 rounded transition-all duration-[350ms]" />
          ) : (
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]" />
          )}
          {passwordScore > 14 ? (
            <div className="w-1/4 h-full bg-green-400 rounded transition-all duration-[350ms]" />
          ) : (
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]" />
          )}
          </div>
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('Password')}</h2>
          <AiOutlineLock size={40}/>
          <p className={`font-p text-xl ${passwordMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(passwordMessage)}</p>
        </div>}
        <div className="w-12 bg-transparent cursor-pointer" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <AiOutlineCheck size={30}/> : <AiOutlineEdit size={30}/>}
        </div>
      </fieldset>
      <fieldset
        className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap"
      >
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <BsPhone size={30}/>
        </div>
        {isEditable ?
        <div className="flex flex-col justify-center items-center gap-2">
          <input
          type="tel"
          pattern="([0-9]{2})[0-9]{5}-[0-9]{4}"
          id="phone"
          value={newPhone === undefined || newPhone === null || newPhone === 'undefined' ? '' : newPhone}
          className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPhone(event.target.value)}
          />
        </div>
        : 
        <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
          <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">{t('Phone Number')}</h2>
          <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">{newPhone === 'undefined' ? t('No phone registered') : newPhone}</p>
          <p className={`font-p text-xl ${phoneMessage !== 'Field updated successfully' ? 'text-red-600' : 'text-green-600'}`}>{t(phoneMessage)}</p>
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
        text={t('Exit')}
        color="bg-red-600"
        onClick={() => handleExit()}
        />
        <Button
        text={t('Delete Account')}
        color="bg-black"
        onClick={() => handleDelete()}
        />
      </div>
    </form>
  )
}

export default Update