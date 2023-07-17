import { api } from "@/api/axios"
import { Sale } from "@/entities/sale"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const updateSale = async (params:Partial<Sale>, id: number): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.patch(`sale/${id}`, {
      product: params.product ?? undefined,
      seller: params.seller ?? undefined,
      sold_at: params.sold_at ?? undefined
    }, {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    if (response.data === 'Sale updated successfully'){
      return 'Field updated successfully'
    } else {
      return 'Successfull, but unknown response from server'
    }
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