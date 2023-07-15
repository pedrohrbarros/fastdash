import { api } from "@/api/axios"
import { Sale } from "@/entities/sale"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const getAllSales = async (): Promise<Sale[] | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.get('sales/', {
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