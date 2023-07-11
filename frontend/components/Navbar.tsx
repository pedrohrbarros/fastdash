import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { getProfile } from "@/services/user/getProfile";
import { useEffect } from "react";
import { userStore } from "@/hooks/userState";
import Loader from "./Loader";
import Link from "next/link";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";

function Navbar() {
  const { t } = useTranslation("navbar");

  const firstname = userStore((state) => state.firstname);
  const setFirstName = userStore((state) => state.setFirstName);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      const data = await getProfile();
      if (typeof data !== "boolean") {
        setFirstName(data.firstname);
        setLoader(false);
      } else {
        window.location.replace('/')
      }
    };
    fetchData();
  }, [firstname]);

  return (
    <nav className="bg-white w-full h-auto flex flex-row justify-end items-center pr-6 gap-4 flex-wrap py-5 pl-20 text-end max-[500px]:justify-center max-[500px]:px-0 max-[500px]:flex-col">
      <h1 className="font-h1 text-black text-2xl max-[300px]:text-xl">
        FastDash
      </h1>
      {loader === false ? (
        <h2 className="font-h2 text-xl text-black max-[300px]:text-sm">
          {t("Welcome") + " " + firstname}
        </h2>
      ) : (
        <Loader />
      )}
      <li className="w-full h-auto hidden flex-row justify-around items-center gap-10 flex-wrap max-[500px]:flex">
        <Link className="h-auto p-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/home">
          <RxDashboard size={30} color="#000000"/>
        </Link>
        <Link className="h-auto p-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/models">
          <AiOutlineUser size={30} color="#000000"/>
        </Link>
        <Link className="h-auto p-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/comercial">
          <AiOutlineShoppingCart size={30} color="#000000"/>
        </Link>
        <Link className="h-auto p-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/config">
          <BsGear size={30} color="#000000"/>
        </Link>
      </li>
    </nav>
  );
}

export default Navbar;
