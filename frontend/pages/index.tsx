import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import TextInput from '../components/TextInput'
import Button from "@/components/Button"
import { BsFacebook } from 'react-icons/bs'
import { AiOutlineGoogle, AiFillTwitterCircle } from 'react-icons/ai'
import { useState, ChangeEvent, useEffect } from 'react'
import { easeInOut, motion } from 'framer-motion'
import validator from 'validator'
import { createUser } from '../hooks/createUser'

export default function Auth() {
  const { t } = useTranslation("auth")

  const [formState, setFormState] = useState('login')
  const [firstName ,setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const role = 'operational'
  
  const passwordScore = validator.isStrongPassword(password, {
    minLength: 8,
    returnScore: true,
    pointsPerUnique: 0.5,
    pointsPerRepeat: 0,
    pointsForContainingLower: 1,
    pointsForContainingUpper: 3,
    pointsForContainingNumber: 1.5,
    pointsForContainingSymbol: 4
  })

  return (
    <main className="w-full h-full min-h-screen flex flex-nowrap flex-col justify-center items-center bg-jet py-9 px-6 gap-4">
      <motion.h1 className="font-h1 text-5xl text-white"
      initial = {{ 
        translateX: -20,
        opacity: 0,
      }}
      animate = {{
        translateX: 0,
        opacity: 1
      }}
      key={formState}
      exit = {{
        translateX: -20,
        opacity: 1
      }}
      transition = {{
        type: easeInOut,
        stiffness: 260,
        duration: 0.6
      }}
      >{formState === 'login' ? t('Sign in') : t('Sign up')}</motion.h1>
      <motion.h2 className="font-h2 text-2xl text-white mb-6"
      initial = {{ 
        translateX: -20,
        opacity: 0,
      }}
      animate = {{
        translateX: 0,
        opacity: 1
      }}
      transition = {{
        type: easeInOut,
        stiffness: 260,
        duration: 0.6
      }}
      >{t('Insert your credentials below')}</motion.h2>
      {formState === 'login' ? 
      <motion.form id="login" name="login" autoComplete='on' className=" w-[45%] min-w-[300px] h-full flex flex-col justify-center items-start gap-10"
      onSubmit={() => location.replace('/home')}
      initial = {{ 
        translateX: -20,
        opacity: 0,
      }}
      animate = {{
        translateX: 0,
        opacity: 1
      }}
      transition = {{
        type: easeInOut,
        stiffness: 260,
        duration: 0.6
      }}
      >
        <TextInput text={t('E-mail adress')} id="email" type="email" required/>
        <TextInput text={t('Password')} id="password" type="password" required/>
        <a className="text-white font-a text-xl" href="/forgot-password" target="_blank" rel="noopener">{t('Forgot your password?')}</a>
        <input
        type="submit"
        value="Login"
        className="w-full outline-none border-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-xl px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all font-p cursor-pointer"
        />
        <Button
        text={t('Sign up')}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        onClick={() => setFormState('register')}
        />
        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-8">
          <button className="rounded-[50%] w-auto h-auto flex justify-center items-center bg-[#405a91] p-2">
            <BsFacebook size={30} color="#FFFFFF"/>
          </button>
          <button className="rounded-[50%] w-auto h-auto flex justify-center items-center p-2 bg-[#e94235]">
            <AiOutlineGoogle size={30} color="#FFFFFF"/>
          </button>
          <button className="rounded-[50%] w-auto h-auto flex justify-center items-center p-2 bg-[#50a4f0]">
            <AiFillTwitterCircle size={30} color="#FFFFFF"/>
          </button>
        </div>
      </motion.form>
      : 
      <motion.form
      id="register" name="register" autoComplete='on' className=" w-[45%] min-w-[250px] h-full flex flex-col justify-center items-start gap-10 max-[405px]:py-5"
      onSubmit={() => createUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        role: role
      })}
      initial = {{ 
        translateX: -20,
        opacity: 0,
      }}
      animate = {{
        translateX: 0,
        opacity: 1
      }}
      transition = {{
        type: easeInOut,
        stiffness: 260,
        duration: 0.6
      }}
      >
        <TextInput
        id="firstName"
        type="text"
        required
        text={t('First name')}
        />
        <TextInput
        id="lastName"
        type="text"
        required
        text={t('Last name')}
        />
        <TextInput
        id="email"
        type="text"
        required
        text={t('E-mail adress')}
        />
        <TextInput
        type="number"
        id="tel"
        inputMode="tel"
        required={false}
        text={t('Phone number')}
        />
        <div className="w-full h-auto flex flex-col justify-center items-start gap-2 relative">
          <input
          type="password"
          id="password"
          name="password"
          placeholder={t('Password') || 'Password'}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]">{t('Password')}</label>
          <div className="w-full h-2 flex flex-row justify-center gap-2 items-center flex-nowrap">
            {passwordScore >= 4 ? <div className="w-1/4 h-full bg-red-600 rounded transition-all duration-[350ms]"/> :
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]"/>}
            {passwordScore >= 7 ? <div className="w-1/4 h-full bg-amber-400 rounded transition-all duration-[350ms]"/> :
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]"/>}
            {passwordScore > 13 ? <div className="w-1/4 h-full bg-green-400 rounded transition-all duration-[350ms]"/> :
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]"/>}
            {passwordScore > 14 ? <div className="w-1/4 h-full bg-green-400 rounded transition-all duration-[350ms]"/> :
            <div className="w-1/4 h-full bg-black rounded transition-all duration-[350ms]"/>}
          </div>
          <p className="font-p text-white text-xl">{passwordScore < 13 ? t('Too weak, please add more symbols, numbers or uppercase letters') : t('Strong')}</p>
        </div>
        <div className="w-full h-auto flex flex-row justify-start items-center gap-3 flex-nowrap">
          <input
          id="termsAndConditions"
          name="termsAndConditions"
          type="checkbox"
          className="w-5 h-5"
          required
          />
          <label className="text-white font-label text-xl">{t('I agree with')} <a className="cursor-pointer hover:underline" href="https://www.termsandconditionsgenerator.com/live.php?token=nkJq162uH4ZtLkD05GnQr7k9WEE7lScX" target="_blank" rel="noopener">{t('Terms and Conditions and Privacy Policy')}</a></label>
        </div>
        <input
        type="submit"
        value={t('Sign up') || 'Sign up'}
        className="w-full outline-none border-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-xl px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all font-p cursor-pointer"
        />
        <p className="font-p text-white text-xl cursor-pointer"
        onClick={() => setFormState('login')}
        >{t('Already have an account? Log-in')}</p>
      </motion.form>
      }
    </main>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
      // Will be passed to the page component as props
    },
  };
}
