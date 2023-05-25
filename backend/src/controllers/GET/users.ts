import { type User } from '../../models/user'
import { type HTTPRequest, type HTTPResponse } from '../protocols'
import { type IGetRepository, type IGetController } from './protocols'

export class GetUsersController implements IGetController<User> {
  // Constructor to access the getModels function
  constructor (private readonly getUsersRepository: IGetRepository<User>) {}

  async handle (httpRequest?: HTTPRequest<void>): Promise<HTTPResponse<User[]>> {
    try {
      const data: User[] = await this.getUsersRepository.getModels(httpRequest?.params !== null && httpRequest?.params !== undefined ? httpRequest.params : undefined)
      if (data.length === 0 && (httpRequest?.params !== null || httpRequest?.params !== undefined)) {
        return {
          statusCode: 404,
          body: 'User not found'
        }
      } else {
        return {
          statusCode: 200,
          body: data
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'GET METHOD FAILED: INTERNAL ERROR'
      }
    }
  }
}
