import { api } from "@/api/axios"
import { Seller } from "@/entities/seller"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const getSellerProfile = async (id: number): Promise<Seller | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.get(`seller/${id}`, {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)){
      if (error.response) {
        if (error.response.data) {
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