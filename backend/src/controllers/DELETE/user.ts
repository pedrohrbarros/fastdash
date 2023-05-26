import { type DeleteUserRepository } from '../../repositories/DELETE/users'
import { badRequest, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { type IDeleteController } from './protocols'

export class DeleteUserController implements IDeleteController {
  constructor (private readonly deleteUserRepository: DeleteUserRepository) {}
  async handle (httpRequest: HTTPRequest<{ permission: string }>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.params?.id === undefined) {
        return voidRequest('Please define an id and a permission to delete')
      }
      if (httpRequest?.body?.permission === undefined) {
        return badRequest('Please specify a permission to delete')
      }
      if (httpRequest?.params?.id === undefined) {
        return badRequest('Please define an id to delete')
      }
      if (httpRequest.permission === 'operational' || httpRequest.permission === 'manager') {
        return badRequest('This role is not allowed to delete')
      }

      await this.deleteUserRepository.deleteModel(httpRequest.params.id)

      return successfull('User deleted successfully')
    } catch (error) {
      return internalError('DELETE METHOD FAILED: INTERNAL ERROR')
    }
  }
}
