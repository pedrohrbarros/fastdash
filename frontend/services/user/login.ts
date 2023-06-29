import { api } from "@/api/axios";
import { User } from "@/entities/user";
import axios, { AxiosResponse } from "axios";
import { setCookie } from 'cookies-next';

export const loginUser = async (params: Pick<User, 'email' | 'password'>):Promise<boolean | string> => {
  try {
    const response: AxiosResponse<any, any> = await api.post('login/', {
      email: params.email,
      password: params.password
    })
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + 8 * 60 * 60 * 1000)
    setCookie('authorization', response.data, {
      expires: expirationDate
    })
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if(error.response) {
        if (error.response.data === 'Not authorized') {
          return 'Wrong access to API'
        } else if (error.response.data === 'Please provide a valid e-mail adress and password') {
          return 'E-mail or password invalid'
        } else if (error.response.data === 'More than one user found with this e-mail adress') {
          return 'Duplicate user found: Please contact the administrator'
        } else if (error.response.data === 'No users found with this e-mail adress') {
          return 'No user found with this e-mail adress'
        } else if (error.response.data === 'Wrong password') {
          return 'Wrong password'
        } return 'Unkown error response from API'
      } else if (error.request) {
        return 'Requisition Error'
      } else {
        return 'No Response received'
      }
    } else {
      return 'Internal error'
    }
  }
}