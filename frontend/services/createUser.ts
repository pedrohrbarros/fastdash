import { User } from '../entities/user'
import { authAPI } from '../api/axios'
import axios from 'axios'

export const createUser = async (params: Omit<User, "id">): Promise<boolean | string> => {
  try {
    await authAPI.post('users/', {
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: params.password,
      phone: params.phone,
      role: 'operational'
    })
    return true
  } catch(error){
    if(axios.isAxiosError(error)){
      if(error.response) {
        return error.response.data
      } else if (error.request) {
        // No response received
        return error.request
      } else {
        // Requisition configuration error
        return error.message
      }
    } else {
      return 'AxiosError: ' + error
    }
  }
}