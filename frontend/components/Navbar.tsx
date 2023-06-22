import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { getProfile } from "@/services/getProfile";
import { useEffect } from "react";
import { userStore } from "@/hooks/userState";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import Loader from "./Loader";

function Navbar() {
  const { t } = useTranslation("navbar");

  const firstname = userStore((state) => state.firstname);
  const setFirstName = userStore((state) => state.setFirstName);
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      const data = await getProfile();
      if (data === false) {
      } else if (typeof data !== "boolean") {
        setFirstName(data.firstname);
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="bg-white w-full h-14 flex flex-row justify-end items-center px-6 gap-4 flex-wrap">
      <h1 className="font-h1 text-black">FastDash</h1>
      {loader === false ? (
        <h2>{t("Welcome") + " " + firstname}</h2>
      ) : (
        <Loader />
      )}
    </nav>
  );
}

export default Navbar;
