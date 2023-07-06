import React from "react";
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../../entities/user";
import { formStore } from "../../../hooks/formState";
import { easeInOut, motion } from "framer-motion";
import { userStore } from "../../../hooks/userState";
import { loginUser } from "@/services/user/login";
import { useRouter } from 'next/router';
import Loader from "../../Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "@/validators/user/loginUserValidator";
import { BiError } from "react-icons/bi";
import Button from "../../Button";

function LoginForm() {
  const { t } = useTranslation("auth");
  const router = useRouter();
  
  const email = userStore((state) => state.email)
  const setEmail = userStore((state) => state.setEmail)
  const password = userStore((state) => state.password)
  const setPassword = userStore((state) => state.setPassword)
  const [loader, setLoader] = React.useState(false)

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<Pick<User, 'email' | 'password'>>({
    defaultValues: {
      email: email,
      password: password,
    },
    resolver: zodResolver(loginUserSchema)
  });

  const setFormState = formStore((state) => state.setRole);

  const onSubmit: SubmitHandler<Pick<User, 'email' | 'password'>> = async (data: Pick<User, 'email' | 'password'>) => {
    setLoader(true)
    const response: string | boolean = await loginUser(data)
    if (response === true) {
      router.push('/dashboard/home')
    }
    else {
      setEmail('')
      setPassword('')
      setLoader(false)
      alert(t(typeof response === 'string' ? response : 'Unkown error'))
    }
  };

  return (
    <form
      id="login"
      name="login"
      autoComplete="on"
      className="w-[45%] min-w-[300px] h-full flex flex-col justify-center items-start gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div
        className="w-full h-auto flex flex-col justify-center items-start gap-2 relative"
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
          duration: 0.7,
        }}
      >
        <input
          type="email"
          id="email"
          placeholder={t("Email") || "Email"}
          disabled={isSubmitting}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("email")}
        />
        <label
          htmlFor="email"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Email")}
        </label>
        {errors.email?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-nowrap gap-2">
            <BiError size="25px" />
            {t(errors.email?.message)}
          </p>
        )}
      </motion.div>
      <motion.div
        className="w-full h-auto flex flex-col justify-center items-start gap-2 relative"
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
          duration: 1.1,
        }}
      >
        <input
          type="password"
          id="password"
          placeholder={t("Password") || "Password"}
          disabled={isSubmitting}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("password")}
        />
        <label
          htmlFor="password"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Password")}
        </label>
        {errors.password?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-nowrap gap-2">
            <BiError size="25px" />
            {t(errors.password?.message)}
          </p>
        )}
      </motion.div>
      {loader === false ? <input
        type="submit"
        value="Login"
        className="w-full outline-none border-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-xl px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all font-p cursor-pointer"
      /> : 
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <Loader/>
        </div>}
      <Button
        text={t("Sign up")}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        onClick={() => setFormState("register")}
      />
    </form>
  );
}

export default LoginForm;
