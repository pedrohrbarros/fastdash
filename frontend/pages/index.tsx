import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { easeInOut, motion } from "framer-motion"
import { formStore } from "../hooks/formState"
import LoginForm from "../components/Forms/Login"
import RegisterForm from "../components/Forms/Register"

export default function Auth() {
  const { t } = useTranslation("auth");

  const formState = formStore((state) => state.role)

  return (
    <main className="w-full h-full min-h-screen flex flex-nowrap flex-col justify-center items-center bg-jet py-9 px-6 gap-4 text-center max-[400px]:px-4">
      <motion.h1
        className="font-h1 text-5xl text-white"
        initial={{
          translateX: -20,
          opacity: 0,
        }}
        animate={{
          translateX: 0,
          opacity: 1,
        }}
        key={formState}
        exit={{
          translateX: -20,
          opacity: 1,
        }}
        transition={{
          stiffness: 260,
          duration: 0.6,
        }}
      >
        {formState === "login" ? t("Sign in") : formState === 'register' ? t("Sign up") : null}
      </motion.h1>
      <motion.h2
        className="font-h2 text-2xl text-white mb-6"
        initial={{
          translateX: -20,
          opacity: 0,
        }}
        animate={{
          translateX: 0,
          opacity: 1,
        }}
        transition={{
          type: easeInOut,
          stiffness: 260,
          duration: 0.6,
        }}
      >
        {t("Insert your credentials below")}
      </motion.h2>
      {formState === "login" ? <LoginForm /> : formState === 'register' ? <RegisterForm /> : null}
    </main>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
      // Will be passed to the page component as props
    },
  };
}
