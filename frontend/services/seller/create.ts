import { api } from "@/api/axios"
import { Seller } from "@/entities/seller"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const createSeller = async (params: Omit<Seller, "id">): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.post('seller/', {
      name: params.name,
      age: params.age,
      location: params.location
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