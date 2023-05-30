import React from "react";
import { useTranslation } from "next-i18next";
import { userStore } from "../../hooks/userState";
import { passwordValidator } from "../../helpers/passwordValidator";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../entities/user";
import { formStore } from "../../hooks/formState";
import { easeInOut, motion } from "framer-motion";
import { ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "../../validators/createUserValidator";

function RegisterForm() {
  const { t } = useTranslation("auth");

  const firstName = userStore((state) => state.firstName);
  const lastName = userStore((state) => state.lastName);
  const email = userStore((state) => state.email);
  const password = userStore((state) => state.password);
  const setPassword = userStore((state) => state.setPassword);
  const phone = userStore((state) => state.phone);

  const passwordScore = passwordValidator(password);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<User, "id">>({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
    },
    resolver: zodResolver(userInfoSchema),
  });
  const setFormState = formStore((state) => state.setRole);

  const onSubmit: SubmitHandler<Omit<User, "id">> = (
    data: Omit<User, "id">
  ) => {
    console.log(data);
    setPassword("");
  };

  return (
    <form
      id="register"
      name="register"
      autoComplete="on"
      className=" w-[45%] min-w-[250px] h-full flex flex-col justify-center items-start gap-10 max-[405px]:py-5"
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
          type="text"
          id="firstName"
          placeholder={t("First name") || "First name"}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("firstName")}
        />
        <label
          htmlFor="firstName"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("First name")}
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
          duration: 0.9,
        }}
      >
        <input
          type="text"
          id="lastName"
          placeholder={t("Last name") || "Last name"}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("lastName")}
        />
        <label
          htmlFor="lastName"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Last name")}
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
          type="number"
          id="phone"
          inputMode="tel"
          placeholder={t("Phone number") || "Phone number"}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("phone")}
        />
        <label
          htmlFor="phone"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Phone number")}
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
          duration: 1.3,
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
          duration: 1.5,
        }}
      >
        <input
          type="password"
          id="password"
          placeholder={t("Password") || "Password"}
          required
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("password", {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value),
          })}
        />
        <label
          htmlFor="password"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Password")}
        </label>
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
        <p className="font-p text-white text-xl">
          {passwordScore < 13
            ? t(
                "Too weak, please add more symbols, numbers or uppercase letters"
              )
            : t("Strong")}
        </p>
      </motion.div>
      <div className="w-full h-auto flex flex-row justify-start items-center gap-3 flex-nowrap">
        <input
          id="termsAndConditions"
          name="termsAndConditions"
          type="checkbox"
          className="w-5 h-5"
          required
        />
        <label className="text-white font-label text-xl">
          {t("I agree with")}{" "}
          <a
            className="cursor-pointer hover:underline"
            href="https://www.termsandconditionsgenerator.com/live.php?token=nkJq162uH4ZtLkD05GnQr7k9WEE7lScX"
            target="_blank"
            rel="noopener"
          >
            {t("Terms and Conditions and Privacy Policy")}
          </a>
        </label>
      </div>
      <input
        type="submit"
        value={t("Sign up") || "Sign up"}
        className="w-full outline-none border-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-xl px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all font-p cursor-pointer"
      />
      <p
        className="font-p text-white text-xl cursor-pointer"
        onClick={() => setFormState("login")}
      >
        {t("Already have an account? Log-in")}
      </p>
    </form>
  );
}

export default RegisterForm;
