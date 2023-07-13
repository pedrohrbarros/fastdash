import { api } from "@/api/axios";
import { Product } from "@/entities/product";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

export const getAll = async (): Promise<Product[] | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.get('products/', {
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