import { api } from "@/api/axios";
import { User } from "@/entities/user";
import { AxiosResponse } from "axios";
import { getCookie } from 'cookies-next';

export const getProfile = async (): Promise<User | boolean> => {
  try {
    const response: AxiosResponse<any, any> = await api.get("user/", { 
      headers: {
        'authorization': getCookie('authorization')
      }
     });
    return response.data;
  } catch (error) {
    console.log(error)
    return false;
  }
};
