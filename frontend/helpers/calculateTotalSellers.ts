import { Seller } from "@/entities/seller"
import { getAllSellers } from "@/services/seller/getAll"

export const calculateTotalSellers = async (): Promise<{total_sellers: number, total_sellers_percentage: number} | string> => {
  const data: Seller[] | string = await getAllSellers()
  if (typeof data === 'string') {
    const message: string = data
    return message
  } else {
    const sellers = data.length
    const initial_sellers: number = 20
    const total_sellers_percentage: number = sellers - initial_sellers
    return {
      total_sellers: sellers,
      total_sellers_percentage: total_sellers_percentage
    }
  }
}