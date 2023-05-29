import { User } from '../entities/user'
import { authAPI } from '../api/axios'
import axios, { AxiosError } from 'axios'

const createUser = async (params: User): Promise<string> => {
  try {
    await authAPI.post('/users/', {
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: params.password,
      phone: params.phone,
      role: 'operational'
    })
    return 'Successfully created'
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