import { type User } from '../../../models/user'

// Params to the user when he is gonna register
export interface CreateUserPrams {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

// Interface to create the return of the function to create user
export interface ICreateUserRepository {
  createUser: (params: CreateUserPrams) => Promise<User>
}
