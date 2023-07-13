import { api } from "@/api/axios";
import { Product } from "@/entities/product";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

export const createProduct = async (params: Omit<Product, "id">): Promise<boolean | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.post("product/", {
      name: params.name,
      price: params.price
    }, 
    {headers: {
      'authorization': getCookie('authorization')
    }})
    if(response.data === "Product created successfully") {
      return true 
    } else {
      return "Successfull, but unknown response from server"
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