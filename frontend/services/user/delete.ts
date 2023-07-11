import { api } from "@/api/axios"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const deleteUser = async (): Promise<boolean | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.delete('user/', {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    if (response.data === 'User deleted successfully') {
      return true
    } else {
      return "Successfull, but unknown response from server"
    }
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