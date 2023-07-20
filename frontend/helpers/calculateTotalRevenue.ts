import { Concat } from "@/entities/concat"
import { getAllConcat } from "@/services/concat/getAll"

export const calculateTotalRevenue  = async (): Promise<{total_revenue: number, total_revenue_percentage: number} | string> => {
  const data: Concat[] | string = await getAllConcat()
  if (typeof data === 'string') {
    const message: string = data
    return message
  } else {
    const concats = data
    let total_sold_at: number = 0
    let total_price: number = 0
    concats.map((concat) => {
      total_sold_at = total_sold_at + +concat.sold_at
      total_price = total_price + +concat.price
    })
    const total_revenue: number = total_sold_at - total_price
    const total_revenue_percentage: number = total_sold_at / total_price  * 100
    return {
      total_revenue: +total_revenue.toFixed(2),
      total_revenue_percentage: +total_revenue_percentage.toFixed()
    }
  }
}