import { type DeleteUserRepository } from '../../repositories/DELETE/users'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { type IDeleteController } from './protocols'

export class DeleteUserController implements IDeleteController {
  constructor (private readonly deleteUserRepository: DeleteUserRepository) {}
  async handle (httpRequest: HTTPRequest<{ permission: string }>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.params?.id === undefined) {
        return {
          statusCode: 404,
          body: 'Please define an id and a permission to delete'
        }
      }
      if (httpRequest?.body?.permission === undefined) {
        return {
          statusCode: 400,
          body: httpRequest?.body?.permission
        }
      }
      if (httpRequest?.params?.id === undefined) {
        return {
          statusCode: 400,
          body: 'Please define an id to delete'
        }
      }
      if (httpRequest.permission === 'operational' || httpRequest.permission === 'manager') {
        return {
          statusCode: 403,
          body: 'This role is not allowed to delete'
        }
      }

      await this.deleteUserRepository.deleteModel(httpRequest.params.id)

      return {
        statusCode: 200,
        body: 'User deleted successfully'
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'DELETE METHOD FAILED: INTERNAL ERROR'
      }
    }
  }
}
