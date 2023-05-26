import { type User } from '../../models/user'
import { internalError, noContent, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'
import { type IGetRepository, type IGetController } from './protocols'

export class GetUsersController implements IGetController<User> {
  // Constructor to access the getModels function
  constructor (private readonly getUsersRepository: IGetRepository<User>) {}

  async handle (httpRequest?: HTTPRequest<void>): Promise<HTTPResponse<User[] | string>> {
    try {
      const data: User[] = await this.getUsersRepository.getModels(httpRequest?.params?.id !== null && httpRequest?.params?.id !== undefined ? httpRequest?.params?.id : undefined)
      if (data.length === 0 && (httpRequest?.params !== null || httpRequest?.params !== undefined)) {
        return noContent('User not found')
      } else {
        return successfull(data)
      }
    } catch (error) {
      return internalError('GET METHOD FAILED: INTERNAL ERROR')
    }
  }
}
