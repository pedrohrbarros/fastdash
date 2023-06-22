import { User } from '../entities/user'
import { authAPI } from '../api/axios'
import axios, { AxiosResponse } from 'axios'

export const createUser = async (params: Omit<User, "id">): Promise<boolean | string> => {
  try {
    const response: AxiosResponse<any, any> = await authAPI.post('user/', {
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: params.password,
      phone: params.phone
    })
    if (response.data === 'User created successfully') {
      return true
    } else {
      return 'Successfull, but unknown response from server'
    }
  } catch(error){
    if(axios.isAxiosError(error)){
      if(error.response) {
        if(error.response.data === 'Not authorized') {
          return 'Wrong access to API'
        } else if (error.response.data === 'User with this e-mail already exists') {
          return 'User already exists'
        } else if (error.response.data === 'Invalid e-mail adress') {
          return 'Invalid e-mail adress'
        } else if (error.response.data === 'Invalid phone number') {
          return 'Invalid phone number'
        }
        const requiredFields: string[] = ['firstName', 'lastName', 'email', 'password']
        for (const field of requiredFields) {
          if (error.response.data === `Field ${field} is required`) {
            return `Field ${field} is required`
          }
        }
        return 'Error in response from API'
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