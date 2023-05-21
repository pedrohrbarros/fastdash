import { type User } from '../../models/user'
import { type HTTPResponse } from '../protocols'

export interface IGetUsersController {
  handle: () => Promise<HTTPResponse<User[]>>
}

export interface IGetUsersRepository {
  getUsers: () => Promise<User[]>
}
