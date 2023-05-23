import { type User } from '../../../models/user'
import { type HTTPRequest, type HTTPResponse } from '../../protocols'

export interface ICreateUserController {
  handle: (httpRequest: HTTPRequest<CreateUserParams>) => Promise<HTTPResponse<User>>
}

// Params to the user when he is gonna register
export interface CreateUserParams extends User {}

// Interface to create the return of the function to create user
export interface ICreateUserRepository {
  createUser: (params: CreateUserParams) => Promise<void>
}
