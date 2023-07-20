import { api } from "@/api/axios"
import { Concat } from "@/entities/concat"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export const getAllConcat = async (): Promise<Concat[] | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.get('concats/', {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
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