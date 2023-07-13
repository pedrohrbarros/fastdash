import { Seller } from "@/entities/seller"
import { create } from "zustand"

interface SellerState extends Seller {
  setName:(name: string) => void
  setAge:(age: number) => void
  setLocation:(location: string) => void
}

export const sellerStore = create<SellerState>()((set) => ({
  id: 0,
  name: '',
  age: 0,
  location:'',

  setName: (name: string) => set(() => ({
    name: name
  })),
  setAge: (age: number) => set(() => ({
    age: age
  })),
  setLocation: (location: string) => set(() => ({
    location: location
  }))
}))