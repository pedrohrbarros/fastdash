import { Product } from "@/entities/product"
import { getAll } from "@/services/product/getAll"

export const calculateTotalProducts = async (): Promise<{total_products: number, total_products_percentage: number} | string> => {
  const data: Product[] | string = await getAll()
  if (typeof data === 'string') {
    const message: string = data
    return message
  } else {
    const products: number = data.length
    const initial_products: number = 100
    const total_products_percentage: number = products - initial_products
    return {
      total_products: products,
      total_products_percentage: total_products_percentage
    }
  }
}