import { User } from '../entities/user'
import { authAPI } from '../api/axios'
import axios from 'axios'

export const createUser = async (params: Omit<User, "id">): Promise<boolean | string> => {
  try {
    await authAPI.post('user/', {
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: params.password,
      phone: params.phone
    })
    return true
  } catch(error){
    console.error(error)
    if(axios.isAxiosError(error)){
      if(error.response) {
        if(error.response.data === 'Not authorized') {
          return 'Wrong access to API'
        } else if (error.response.data === 'User with this e-mail already exists') {
          return 'User already exists'
        }
        return 'Error in response from API'
      } else if (error.request) {
        return 'No Response received'
      } else {
        return 'Requisition Error'
      }
    } else {
      return 'Internal error'
    }
  }
}