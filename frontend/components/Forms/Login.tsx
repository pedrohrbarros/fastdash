import React from "react";
import Button from "../Button";
import { AiOutlineGoogle, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../entities/user";
import { formStore } from "../../hooks/formState";
import { easeInOut, motion } from "framer-motion";
import { userStore } from "../../hooks/userState";

function LoginForm() {
  const { t } = useTranslation("auth");

  const email = userStore((state) => state.email);
  const password = userStore((state) => state.password);

  const { register, handleSubmit } = useForm<Partial<User>>({
    defaultValues: {
      email: email,
      password: password,
    },
  });

  const setFormState = formStore((state) => state.setRole);

  const onSubmit: SubmitHandler<Partial<User>> = (data: Partial<User>) => {
  };

  return (
    <form
      id="login"
      name="login"
      autoComplete="on"
      className=" w-[45%] min-w-[300px] h-full flex flex-col justify-center items-start gap-10"
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
      </motion.div>
      <a
        className="text-white font-a text-xl"
        href="/forgot-password"
        target="_blank"
        rel="noopener"
      >
        {t("Forgot your password?")}
      </a>
      <input
        type="submit"
        value="Login"
        className="w-full outline-none border-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-xl px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all font-p cursor-pointer"
      />
      <Button
        text={t("Sign up")}
        color="bg-gradient-to-r from-purple-500 to-pink-500"
        onClick={() => setFormState("register")}
      />
      <div className="w-full flex flex-row flex-wrap justify-center items-center gap-8">
        <button className="rounded-[50%] w-auto h-auto flex justify-center items-center bg-[#405a91] p-2">
          <BsFacebook size={30} color="#FFFFFF" />
        </button>
        <button className="rounded-[50%] w-auto h-auto flex justify-center items-center p-2 bg-[#e94235]">
          <AiOutlineGoogle size={30} color="#FFFFFF" />
        </button>
        <button className="rounded-[50%] w-auto h-auto flex justify-center items-center p-2 bg-[#50a4f0]">
          <AiFillTwitterCircle size={30} color="#FFFFFF" />
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
