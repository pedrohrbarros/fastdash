import { useEffect } from "react";
import { useRouter } from "next/router";
import { hasCookie } from "cookies-next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { type Sale } from "../../../entities/sale";
import { getSaleProfile } from "@/services/sale/getProfile";
import { getAllSales } from "@/services/sale/getAll";
import { saleStore } from "@/hooks/saleState";
import Update from "@/components/Forms/Sale/Update";

export async function getStaticPaths() {
  const data = await getAllSales();
  if (typeof data === "string") {
    return { paths: [], fallback: false };
  } else {
    const paths = data.map((sale) => {
      return {
        params: {
          id: `${sale.id.toString()}`,
        },
      };
    });
    return { paths, fallback: false };
  }
}

function SaleProfile() {
  const router = useRouter();
  const { t } = useTranslation("models");
  const id = router.query.sale;

  useEffect(() => {
    if (hasCookie("authorization") === false) {
      router.push("/");
    }
  });

  const setProduct = saleStore((state) => state.setProduct)
  const setSeller = saleStore((state) => state.setSeller)
  const setSoldAt = saleStore((state) => state.setSoldAt)

  useEffect(() => {
    const fetchData = async () => {
      const response: string | Sale = await getSaleProfile(
        id !== undefined ? +id : 0
      );
      if (typeof response === "string") {
        const message: string = response
        alert(t(message))
      } else {
        const sale: Sale = response;
        setProduct(sale.product);
        setSeller(sale.seller);
        setSoldAt(sale.sold_at)
      }
    };
    fetchData();
  }, []);

  return (
    <body className="w-full h-full min-h-screen bg-gray-100 flex flex-row flex-nowrap">
      <aside>
        <Sidebar />
      </aside>
      <main className="w-full h-full">
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
      ...(await serverSideTranslations(locale, [
        "common",
        "navbar",
        "comercial",
      ])),
      // Will be passed to the page component as props
    },
  };
}

export default SaleProfile;
