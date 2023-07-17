import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ChangeEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { FaGem } from 'react-icons/fa'
import { BsCart4 } from 'react-icons/bs'
import Image from "next/image";
import saleIcon from "@/assets/sale-icon.png";
import Button from "../../Button";
import { saleStore } from "@/hooks/saleState";
import { updateSale } from "@/services/sale/update";
import { deleteSale } from "@/services/sale/delete";
import Loader from "@/components/Loader";
import { Product } from "@/entities/product";
import { Seller } from "@/entities/seller";
import { getAll } from "@/services/product/getAll";
import { getAllSellers } from "@/services/seller/getAll";
import { MdAttachMoney } from "react-icons/md";

function Update() {
  const { t } = useTranslation("comercial");
  const router = useRouter();
  const id = router.query.sale;

  const product = saleStore((state) => state.product);
  const seller = saleStore((state) => state.seller)
  const sold_at = saleStore((state) => state.sold_at)
  const setProduct = saleStore((state) => state.setProduct);
  const setSeller = saleStore((state) => state.setSeller);
  const setSoldAt = saleStore((state) => state.setSoldAt)
  const [newProduct, setNewProduct] = useState<string | null>(null);
  const [newSeller, setNewSeller] = useState<string | null>(null);
  const [newSoldAt, setNewSoldAt] = useState<string | null>(null)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [productMessage, displayProductMessage] = useState<string>()
  const [sellerMessage, displaySellerMessage] = useState<string>()
  const [soldAtMessage, displaySoldAtMessage] = useState<string>()
  const [products, setProducts] = useState<Product[]>()
  const [sellers, setSellers] = useState<Seller[]>()

  useEffect(() => {
    setNewProduct(product);
    setNewSeller(seller);
    setNewSoldAt(sold_at)
    const fetchData = async () => {
      const productsData: Product[] | string = await getAll()
      const sellersData: Seller[] | string = await getAllSellers()
      if (typeof sellersData === 'string') {
        const message: string = sellersData
        alert(t(message))
      } else if (typeof productsData === 'string'){
        const message: string = productsData
        alert(t(message))
      }
    }
    fetchData()
  }, [product, seller, sold_at, products, sellers]);

  const handleSubmit = async (): Promise<void> => {
    setIsEditable(false);
    if (newProduct !== product) {
      const response: string = await updateSale(
        {
          product: newProduct,
        },
        id !== undefined ? +id : 0
      );
      setProduct(newProduct);
      displayProductMessage(response);
    }
    if (newSeller !== seller) {
      const response: string = await updateSale(
        {
          seller: newSeller,
        },
        id !== undefined ? +id : 0
      );
      setSeller(newSeller);
      displaySellerMessage(response);
    }
    if (newSoldAt !== sold_at){
      const response: string = await updateSale({
        sold_at: newSoldAt
      }, id !== undefined ? +id : 0)
      setSoldAt(newSoldAt)
      displaySoldAtMessage(response)
    }
  };

  const handleDelete = async () => {
    setProduct(null)
    setSeller(null)
    setSoldAt(null)
    const response: string = await deleteSale(id !== undefined ? +id : 0);
    alert(t(response));
    if (response === "Sale deleted successfully") {
      router.push("/dashboard/comercial");
    }
  };

  return (
    <form
      id="update"
      name="update"
      autoComplete="on"
      className="w-full h-full p-4 max-[500px]:p-2 flex flex-col justify-center items-center gap-10"
    >
      <motion.div
        className="w-auto h-auto rounded-[50%]"
        animate={{
          rotateY: 180,
        }}
        transition={{
          type: "spring",
          duration: 0.8,
          delay: 0.5,
        }}
        key={product || seller || sold_at}
      >
        <Image src={saleIcon} alt="Sale Icon" width={170} height={170} />
      </motion.div>
      <fieldset className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap">
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <BsCart4 size={30} />
        </div>
        {isEditable ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <select
              id="products"
              name="products"
              className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setNewProduct(event.target.value)
              }
            >
              {
                products?.map((product: Product, index) => (
                  <option key={index} value={product.name} className="text-black font-light font-p text-xl">
                    {product.name}
                  </option>
                ))
              }
            </select>
          </div>
        ) : (
          <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
            <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">
              {t("Product")}
            </h2>
            <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">
              {newProduct ?? <Loader/>}
            </p>
            <p
              className={`font-p text-xl ${
                productMessage !== "Field updated successfully"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {t(productMessage ?? '')}
            </p>
          </div>
        )}
        <div
          className="w-12 bg-transparent cursor-pointer"
          onClick={() => setIsEditable(!isEditable)}
        >
          {isEditable ? (
            <AiOutlineCheck size={30} />
          ) : (
            <AiOutlineEdit size={30} />
          )}
        </div>
      </fieldset>
      <fieldset className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap">
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <FaGem size={30} />
        </div>
        {isEditable ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <select
              id="sellers"
              name="sellers"
              className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setNewProduct(event.target.value)
              }
            >
              {
                sellers?.map((seller: Seller, index) => (
                  <option key={index} value={seller.name} className="text-black font-light font-p text-xl">
                    {seller.name}
                  </option>
                ))
              }
            </select>
          </div>
        ) : (
          <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
            <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">
              {t("Seller")}
            </h2>
            <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">
              {newSeller ?? <Loader/>}
            </p>
            <p
              className={`font-p text-xl ${
                sellerMessage !== "Field updated successfully"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {t(sellerMessage ?? '')}
            </p>
          </div>
        )}
        <div
          className="w-12 bg-transparent cursor-pointer"
          onClick={() => setIsEditable(!isEditable)}
        >
          {isEditable ? (
            <AiOutlineCheck size={30} />
          ) : (
            <AiOutlineEdit size={30} />
          )}
        </div>
      </fieldset>
      <fieldset className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap">
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <MdAttachMoney size={30} />
        </div>
        {isEditable ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              type="text"
              id="sold_at"
              value={newSoldAt ?? ''}
              className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewSoldAt(event.target.value)
              }
            />
          </div>
        ) : (
          <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
            <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">
              {t("Sold at")}
            </h2>
            <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">
              {newSoldAt ?? <Loader/>} R$
            </p>
            <p
              className={`font-p text-xl ${
                soldAtMessage !== "Field updated successfully"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {t(soldAtMessage ?? '')}
            </p>
          </div>
        )}
        <div
          className="w-12 bg-transparent cursor-pointer"
          onClick={() => setIsEditable(!isEditable)}
        >
          {isEditable ? (
            <AiOutlineCheck size={30} />
          ) : (
            <AiOutlineEdit size={30} />
          )}
        </div>
      </fieldset>
      <div className="w-auto h-auto flex flex-col gap-6">
        <Button
          text={t("Save")}
          color="bg-[#581c87]"
          onClick={() => handleSubmit()}
        />
        <Button
          text={t("Delete Sale")}
          color="bg-red-600"
          onClick={() => handleDelete()}
        />
      </div>
    </form>
  );
}

export default Update;
