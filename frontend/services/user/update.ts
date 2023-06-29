import { api } from "@/api/axios";
import { User } from "@/entities/user";
import axios, { AxiosResponse } from "axios";
import { getCookie } from 'cookies-next';

export const updateUser = async (params: Partial<User>): Promise<string> => {
  try {
    const response: AxiosResponse<any, any> = await api.patch('/user', {
      firstname: params.firstname !== undefined ? params.firstname : undefined,
      lastname: params.lastname !== undefined ? params.lastname : undefined,
      email: params.email !== undefined ? params.email : undefined,
      password: params.password !== undefined ? params.password : undefined,
      phone: params.phone !== undefined ? params.phone : undefined
    }, {
      headers: {
        'authorization': getCookie('authorization')
      }
    })
    if (response.data === 'User updated successfully') {
      return response.data
    } else {
      return 'Successfull, but unknown response from server'
    }
    } catch (error) {
    if(axios.isAxiosError(error)) {
      if(error.response) {
        if(error.response.data === 'Please provide a property to update') {
          return 'No property to update'
        } else if (error.response.data === 'User with this token not found') {
          return 'User not authenticated'
        } else if (error.response.data === 'Invalid e-mail adress') {
          return error.response.data
        } else if (error.response.data === 'User with this e-mail already exists') {
          return error.response.data
        } else if (error.response.data === 'Password too weak') {
          return error.response.data
        } else if (error.response.data === 'Invalid phone number') {
          return error.response.data
        } else {
          console.log(error)
          return 'Error in response from API'
        }
      } else if(error.request) {
        return 'Requisition Error'
      } else {
        return 'No Response received'
      }
    } else {
      return 'Internal Error'
    }
  }
}