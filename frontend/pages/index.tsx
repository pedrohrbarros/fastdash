import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import TextInput from '../components/TextInput'
import Button from "@/components/Button"
import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'

export default function Login() {
  const { t } = useTranslation("login");

  return (
    <main className="w-full h-screen flex flex-nowrap flex-col justify-center items-center bg-jet py-9 px-6 gap-4">
      <h1 className="font-h1 text-5xl text-white">{t('Sign in')}</h1>
      <h2 className="font-h2 text-2xl text-white">{t('Insert your credentials below')}</h2>
      <form id="login" name="login" autoComplete='on' className=" w-[35%] min-w-[300px] h-full flex flex-col justify-center items-start gap-10">
        <TextInput text={t('E-mail adress')} id="email"/>
        <TextInput text={t('Password')} id="password"/>
        <a className="text-white font-a text-xl" href="/forgot-password" target="_blank" rel="noopener">{t('Forgot your password?')}</a>
        <Button
        text="Login"
        color="bg-gradient-to-r from-cyan-500 to-blue-500"
        onClick={() => location.replace('/home')}
        />
        <Button
        text={t('Sign up')}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        onClick={() => location.replace('/signup')}
        />
        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-8">
          <button className="rounded-[50%] w-auto h-auto flex justify-center items-center bg-[#405a91] p-2">
            <BsFacebook size={30} color="#FFFFFF"/>
          </button>
          <button className="rounded-[50%] w-auto h-auto flex justify-center items-center p-2 bg-pink-500">
            <AiFillInstagram size={30} color="#FFFFFF"/>
          </button>
          <button className="rounded-[50%] w-auto h-auto flex justify-center items-center p-2 bg-[#50a4f0]">
            <AiFillTwitterCircle size={30} color="#FFFFFF"/>
          </button>
        </div>
      </form>
    </main>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login"])),
      // Will be passed to the page component as props
    },
  };
}
