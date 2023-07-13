import { api } from "@/api/axios"
import { Seller } from "@/entities/seller"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const getAllSellers = async (): Promise<Seller[] | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.get('sellers/', {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)){
      if (error.response){
        return error.response.data
      } else if (error.request){
        return 'Requisition Error'
      } else {
        return 'No Response received'
      } 
    } else {
      return 'Internal error'
    }
  }
}