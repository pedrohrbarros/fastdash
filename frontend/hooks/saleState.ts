import { Sale } from "@/entities/sale"
import { create } from "zustand"

interface SaleState extends Sale {
  setProduct:(product: string | null) => void
  setSeller:(seller: string | null) => void
  setSoldAt:(sold_at: string | null) => void
}

export const saleStore = create<SaleState>()((set) => ({
  id: 0,
  product: null,
  seller: null,
  sold_at: null,

  setProduct: (product: string | null) => set(() => ({
    product: product
  })),
  setSeller: (seller: string | null) => set(() => ({
    seller: seller
  })),
  setSoldAt: (sold_at: string | null) => set(() => ({
    sold_at: sold_at
  }))
}))