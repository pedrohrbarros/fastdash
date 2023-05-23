import { type User } from '../../../models/user'
import { type HTTPResponse } from '../../protocols'

// GET Procotol to ensure that the controller return the HTTP response, and the getUsers method return the users that will be returned inside of the body on the HTTPResponse

export interface IGetUsersController {
  handle: () => Promise<HTTPResponse<User[]>>
}

export interface IGetUsersRepository {
  getUsers: () => Promise<User[]>
}
