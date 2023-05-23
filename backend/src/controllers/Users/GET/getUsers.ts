import { type User } from '../../../models/user'
import { type HTTPResponse } from '../../protocols'
import { type IGetUsersRepository, type IGetUsersController } from './protocols'

// Controller for handling the fetching of the users data from the database and insert it into the HTTPResponse type
// Validate the data from the get users from repository

export class GetUsersController implements IGetUsersController {
  constructor (private readonly getUsersRepository: IGetUsersRepository) {}

  async handle (): Promise<HTTPResponse<User[]>> {
    try {
      const users = await this.getUsersRepository.getUsers()
      return {
        statusCode: 200,
        body: users
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      }
    }
  }
}
