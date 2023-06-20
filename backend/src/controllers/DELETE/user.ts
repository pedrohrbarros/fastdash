import { type DeleteUserRepository } from '../../repositories/DELETE/users'
import {
  internalError,
  successfull,
  voidRequest
} from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { type IDeleteController } from './protocols'

export class DeleteUserController implements IDeleteController<{ jwt_token: string }> {
  constructor (private readonly deleteUserRepository: DeleteUserRepository) {}
  async handle (
    httpRequest: HTTPRequest<{ jwt_token: string }>
  ): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.headers?.jwt_token === undefined) {
        return voidRequest('Please define an id and a permission to delete')
      }

      await this.deleteUserRepository.deleteModel(httpRequest.params.id)

      return successfull('User deleted successfully')
    } catch (error) {
      return internalError('DELETE METHOD FAILED: INTERNAL ERROR')
    }
  }
}
