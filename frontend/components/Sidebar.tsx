import React from 'react'
import { BsLightning } from 'react-icons/bs'
import { BsGear } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Link from 'next/link'

function Sidebar() {
  return (
    <aside className="w-20 bg-white h-full flex flex-col py-14 px-4 justify-start items-center gap-4 z-50 max-[700px]:hidden">
      <a className="w-full h-auto py-3 rounded-lg bg-purple-900 flex flex-col justify-center items-center" href="#">
          <BsLightning size={30} color="#FFFFFF"/>
      </a>
      <hr className="w-full h-[1px] bg-gray-200 rounded-lg"/>
      <li className="w-full h-auto flex flex-col justify-start items-center gap-10">
        <Link className="w-full h-auto py-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/home">
          <RxDashboard size={30} color="#000000"/>
        </Link>
        <Link className="w-full h-auto py-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/models">
          <AiOutlineUser size={30} color="#000000"/>
        </Link>
        <Link className="w-full h-auto py-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/comercial">
          <AiOutlineShoppingCart size={30} color="#000000"/>
        </Link>
        <Link className="w-full h-auto py-3 rounded-lg bg-gray-200 flex flex-col justify-center items-center" href="/dashboard/config">
          <BsGear size={30} color="#000000"/>
        </Link>
      </li>
    </aside>
  )
}

export default Sidebar