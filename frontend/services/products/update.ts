import { Product } from "@/entities/product";
import axios, { AxiosResponse } from "axios";
import { api } from '@/api/axios';
import { getCookie } from "cookies-next";

export const updateProduct = async (params: Partial<Product>, id: number): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.patch(`product/${id}`, {
      name: params.name !== undefined ? params.name : undefined,
      price: params.price !== undefined ? params.price : undefined
    }, {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    if (response.data === 'Product updated successfully'){
      return 'Field updated successfully'
    } else {
      return 'Successfull, but unknown response from server'
    }
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error)
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