import { Product } from "@/entities/product";
import { create } from "zustand";

interface ProductState extends Product {
  setName: (name: string) => void
  setPrice: (price: number) => void
}

export const productStore = create<ProductState>()((set) => ({
  id: 0,
  name: '',
  price: 0,

  setName: (name: string) => set(() => ({ name: name })),
  setPrice: (price: number) => set(() => ({ price: price }))
}))