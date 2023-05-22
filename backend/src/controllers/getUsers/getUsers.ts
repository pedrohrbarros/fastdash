import { type User } from '../../models/user'
import { type HTTPResponse } from '../protocols'
import { type IGetUsersData, type IGetUsersController } from './protocols'

export class GetUsersController implements IGetUsersController {
  constructor (private readonly getUsersData: IGetUsersData) {}

  async handle (): Promise<HTTPResponse<User[]>> {
    try {
      const users = await this.getUsersData.getUsers()
      return {
        statusCode: 200,
        body: users
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.'
      }
    }
  }
}
