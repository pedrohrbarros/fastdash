import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ChangeEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CgNametag } from "react-icons/cg";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { FaGem } from 'react-icons/fa'
import { BiLocationPlus } from 'react-icons/bi'
import Image from "next/image";
import sellerIcon from "@/assets/seller-icon.png";
import Button from "../../Button";
import { sellerStore } from "@/hooks/sellerState";
import { updateSeller } from "@/services/seller/update";
import { deleteSeller } from "@/services/seller/delete";
import Loader from "@/components/Loader";

function Update() {
  const { t } = useTranslation("models");
  const router = useRouter();
  const id = router.query.seller;

  const name = sellerStore((state) => state.name);
  const age = sellerStore((state) => state.age)
  const location = sellerStore((state) => state.location)
  const setName = sellerStore((state) => state.setName);
  const setAge = sellerStore((state) => state.setAge);
  const setLocation = sellerStore((state) => state.setLocation)
  const [newName, setNewName] = useState<string>();
  const [newAge, setNewAge] = useState<number>(0);
  const [newLocation, setNewLocation] = useState<string>()
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [nameMessage, displayNameMessage] = useState<string>()
  const [ageMessage, displayAgeMessage] = useState<string>()
  const [locationMessage, displayLocationMessage] = useState<string>()

  useEffect(() => {
    setNewName(name);
    setNewAge(age);
    setNewLocation(location)
  }, [name, age, location]);

  const handleSubmit = async (): Promise<void> => {
    setIsEditable(false);
    if (newName !== name) {
      const response: string = await updateSeller(
        {
          name: newName,
        },
        id !== undefined ? +id : 0
      );
      setName(name);
      displayNameMessage(response);
    }
    if (newAge !== age && +newAge > 0) {
      const response: string = await updateSeller(
        {
          age: newAge,
        },
        id !== undefined ? +id : 0
      );
      setAge(age);
      displayAgeMessage(response);
    }
    if (newLocation !== location){
      const response: string = await updateSeller({
        location: newLocation
      }, id !== undefined ? +id : 0)
      setLocation(location)
      displayLocationMessage(response)
    }
  };

  const handleDelete = async () => {
    setName('')
    setAge(0)
    setLocation('')
    const response: string = await deleteSeller(id !== undefined ? +id : 0);
    if (response === "Seller deleted successfully") {
      alert(t(response));
      router.push("/dashboard/models");
    } else {
      alert(t(response));
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
        key={name || age || location}
      >
        <Image src={sellerIcon} alt="Seller Icon" width={170} height={170} />
      </motion.div>
      <fieldset className="w-full flex flex-row justify-center items-center text-center gap-4 max-[500px]:gap-2 flex-wrap">
        <div className="w-12 p-2 rounded-[50%] flex flex-col justify-center items-center shadow-xl">
          <CgNametag size={30} />
        </div>
        {isEditable ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              type="text"
              id="name"
              value={newName}
              className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewName(event.target.value)
              }
            />
          </div>
        ) : (
          <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
            <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">
              {t("Name")}
            </h2>
            <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">
              {newName ?? <Loader/>}
            </p>
            <p
              className={`font-p text-xl ${
                nameMessage !== "Field updated successfully"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {t(nameMessage ?? '')}
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
            <input
              type="number"
              id="price"
              value={newAge}
              className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewAge(+event.target.value)
              }
            />
          </div>
        ) : (
          <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
            <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">
              {t("Age")}
            </h2>
            <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">
              {newAge ?? <Loader/>}
            </p>
            <p
              className={`font-p text-xl ${
                ageMessage !== "Field updated successfully"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {t(ageMessage ?? '')}
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
          <BiLocationPlus size={30} />
        </div>
        {isEditable ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              type="text"
              id="location"
              value={newLocation}
              className="outline-none border-b-[1px] border-b-black bg-transparent text-black text-2xl font-extralight text-center max-[500px]:text-xl"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewLocation(event.target.value)
              }
            />
          </div>
        ) : (
          <div className="w-[350px] max-w-[350px] min-w-[100px] flex flex-col justify-center items-center">
            <h2 className="font-h2 text-gray-600 text-xl font-medium max-[500px]:text-md">
              {t("Location")}
            </h2>
            <p className="font-p text-black text-2xl font-extralight max-[500px]:text-xl">
              {newLocation ?? <Loader/>}
            </p>
            <p
              className={`font-p text-xl ${
                locationMessage !== "Field updated successfully"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {t(locationMessage ?? '')}
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
          text={t("Delete Seller")}
          color="bg-red-600"
          onClick={() => handleDelete()}
        />
      </div>
    </form>
  );
}

export default Update;
