import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TextInput from '../components/TextInput'

export default function Login() {
  const { t } = useTranslation("login");

  return (
    <main className="w-full h-screen flex flex-nowrap flex-col justify-center items-center bg-jet py-9 px-6 gap-4">
      <h1 className="font-h1 text-5xl text-white">{t('Sign in')}</h1>
      <h2 className="font-h2 text-2xl text-white">{t('Insert your credentials below')}</h2>
      <form id="login" name="login" autoComplete='on' className=" w-[35%] min-w-[300px] h-full flex flex-col justify-center items-start gap-10">
        <TextInput text={t('E-mail adress')} id="email"/>
        <TextInput text={t('Password')} id="password"/>
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
