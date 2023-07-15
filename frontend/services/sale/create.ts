import { api } from "@/api/axios"
import { Sale } from "@/entities/sale"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const createSale = async (params: Omit<Sale, "id">): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.post('sale/', {
      product: params.product,
      seller: params.seller,
      sold_at: params.sold_at
    }, {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    return response.data
  } catch (error) {
    if(axios.isAxiosError(error)){
      if(error.response) {
        if (error.response.data){
          return error.response.data
        } else {
          return 'No data in response'
        }
      } else {
        return 'No Response received'
      } 
    } else {
      return 'Internal error'
    }
  }
}