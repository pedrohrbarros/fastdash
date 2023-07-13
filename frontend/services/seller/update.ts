import { api } from "@/api/axios"
import { Seller } from "@/entities/seller"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const updateSeller = async (params: Partial<Seller>, id: number): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.patch(`seller/${id}`, {
      name: params.name ?? undefined,
      age: params.age ?? undefined,
      location: params.location ?? undefined
    }, {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    if (response.data === 'Seller updated successfully'){
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