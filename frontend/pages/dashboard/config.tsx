import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { userStore } from "@/hooks/userState";
import { useTranslation } from "next-i18next";
import { getProfile } from "@/services/user/getProfile";
import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Update from "@/components/Forms/User/Update";
function Config() {
  const { t } = useTranslation("config");

  const setFirstName = userStore((state) => state.setFirstName);
  const setLastName = userStore((state) => state.setLastName);
  const setEmail = userStore((state) => state.setEmail);
  const setPhone = userStore((state) => state.setPhone);

  useEffect(() => {
    
    const fetchData = async () => {
      const data = await getProfile();
      if (data === false) {
        alert(t("Profile not found, please log-in again or register"));
      } else if (typeof data !== "boolean") {
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setPhone(data.phone === null ? t("No phone registered") : data.phone);
      }
    };
    fetchData();
  }, []);

  return (
    <body className="w-full h-full min-h-screen flex flex-row bg-gray-100 flex-nowrap">
      <aside>
        <Sidebar />
      </aside>
      <main className="w-full h-full bg-gray-100">
        <header className="w-full h-auto flex flex-row justify-end items-center">
          <Navbar />
        </header>
        <section className="w-full h-full flex flex-col justify-start items-start relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute"
          >
            <path
              fill="#581c87"
              fill-opacity="1"
              d="M0,256L24,224C48,192,96,128,144,117.3C192,107,240,149,288,144C336,139,384,85,432,96C480,107,528,181,576,229.3C624,277,672,299,720,261.3C768,224,816,128,864,85.3C912,43,960,53,1008,74.7C1056,96,1104,128,1152,133.3C1200,139,1248,117,1296,96C1344,75,1392,53,1416,42.7L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
            ></path>
          </svg>
          <Update />
        </section>
      </main>
    </body>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar", "config"])),
      // Will be passed to the page component as props
    },
  };
}

export default Config;
