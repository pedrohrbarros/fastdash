import { api } from "@/api/axios"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const deleteSeller = async (id: number): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.delete(`seller/${id}`, {
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