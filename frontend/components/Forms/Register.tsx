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
import { BiError } from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";
import { createUser } from "../../services/createUser";
import Loader from "../Loader";

function RegisterForm() {
  const { t } = useTranslation("auth");

  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const firstname = userStore((state) => state.firstname);
  const setFirstName = userStore((state) => state.setFirstName);
  const lastName = userStore((state) => state.lastName);
  const setLastName = userStore((state) => state.setLastName);
  const email = userStore((state) => state.email);
  const setEmail = userStore((state) => state.setEmail);
  const password = userStore((state) => state.password);
  const setPassword = userStore((state) => state.setPassword);
  const phone = userStore((state) => state.phone);
  const setPhone = userStore((state) => state.setPhone);

  const [loader, setLoader] = React.useState(false);
  const passwordScore = passwordValidator(password);
  const recaptcha = React.useRef<any>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<User, "id">>({
    defaultValues: {
      firstname: firstname,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
    },
    resolver: zodResolver(userInfoSchema),
  });
  const setFormState = formStore((state) => state.setRole);

  const onSubmit: SubmitHandler<Omit<User, "id">> = async (
    data: Omit<User, "id">
  ) => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setAcceptedTerms(false);
    if (recaptcha?.current !== undefined && recaptcha?.current !== null) {
      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) {
        alert(t("Please fill the captcha"));
      } else {
        recaptcha.current.reset();
        setLoader(true);
        const response: boolean | string = await createUser(data);
        setLoader(false);
        if (response === true) {
          alert(t("Successfully registered"));
          setFormState("login");
        } else {
          alert(t(response.toString()));
        }
      }
    }
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
          id="firstname"
          placeholder={t("First name") || "First name"}
          required
          disabled={isSubmitting}
          value={firstname}
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("firstname", {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setFirstName(event.target.value),
          })}
        />
        <label
          htmlFor="firstname"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("First name")}
        </label>
        {errors.firstname?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-nowrap gap-2">
            <BiError size="25px" />
            {t(errors.firstname?.message)}
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
          duration: 0.9,
        }}
      >
        <input
          type="text"
          id="lastName"
          placeholder={t("Last name") || "Last name"}
          required
          value={lastName}
          disabled={isSubmitting}
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("lastName", {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setLastName(event.target.value),
          })}
        />
        <label
          htmlFor="lastName"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Last name")}
        </label>
        {errors.lastName?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-nowrap gap-2">
            <BiError size="25px" />
            {t(errors.lastName?.message)}
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
          type="number"
          id="phone"
          inputMode="tel"
          disabled={isSubmitting}
          placeholder={t("Phone number") || "Phone number"}
          required
          value={phone}
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("phone", {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setPhone(event.target.value),
          })}
        />
        <label
          htmlFor="phone"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Phone number")}
        </label>
        {errors.phone?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-wrap gap-2">
            <BiError size="25px" />
            {t(errors.phone?.message)}
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
          duration: 1.3,
        }}
      >
        <input
          type="email"
          id="email"
          placeholder={t("Email") || "Email"}
          required
          value={email}
          disabled={isSubmitting}
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          {...register("email", {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value),
          })}
        />
        <label
          htmlFor="email"
          className="absolute -top-8 left-0 font-label text-[1.20rem] text-white peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-8  peer-focus:left-0 peer-focus:text-[1.20rem] peer-focus:text-white transition-all duration-[250ms]"
        >
          {t("Email")}
        </label>
        {errors.email?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-wrap gap-2">
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
          duration: 1.5,
        }}
      >
        <input
          type="password"
          id="password"
          placeholder={t("Password") || "Password"}
          required
          value={password}
          className="peer w-full p-4 rounded bg-[#1a1d1f] text-xl outline-none text-white placeholder-transparent"
          disabled={isSubmitting}
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
          {passwordScore < 13 && password !== ""
            ? t(
                "Too weak, please add more symbols, numbers or uppercase letters"
              )
            : passwordScore >= 13
            ? t("Strong")
            : null}
        </p>
        {errors.password?.message && (
          <p className="font-p text-xl text-red-500 font-bold flex flex-row justify-start items-center flex-wrap gap-2">
            <BiError size="25px" />
            {t(errors.password?.message)}
          </p>
        )}
      </motion.div>
      <div className="w-full h-auto flex flex-row justify-start items-center gap-3 flex-nowrap">
        <input
          id="termsAndConditions"
          name="termsAndConditions"
          type="checkbox"
          className="w-5 h-5"
          required
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          disabled={isSubmitting}
        />
        <label className="text-white font-label text-xl">
          {t("I agree with")}{" "}
          <a
            className="cursor-pointer hover:underline"
            href={`https://www.termsandconditionsgenerator.com/live.php?token=${
              process.env.NEXT_PUBLIC_TERMS_TOKEN || ""
            }`}
            target="_blank"
            rel="noopener"
          >
            {t("Terms and Conditions and Privacy Policy")}
          </a>
        </label>
      </div>
      <ReCAPTCHA
        size="compact"
        ref={recaptcha}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      />
      {loader ? (
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <input
          type="submit"
          value={t("Sign up") || "Sign up"}
          className="w-full outline-none border-0 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-xl px-5 py-2.5 text-center shadow-[5px_5px_1px_5px_rgba(0,0,0,0.6)] active:shadow-[4px_4px_1px_2px_rgba(0,0,0,0.6)] active:translate-y-[2px] active:translate-x-[2px] transition-all font-p cursor-pointer"
          disabled={isSubmitting}
        />
      )}

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
