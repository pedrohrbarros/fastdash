import { type HTTPRequest, type HTTPResponse } from '../protocols'
import { badRequest, internalError, successfull } from '../helpers'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { RemoveUserRepository } from '../../repositories/REMOVE/user'

export class DeleteUserController {
  async delete (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.headers?.authorization === undefined) {
        return badRequest('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        await new RemoveUserRepository().remove(id)
        return successfull('User deleted successfully')
      }
    } catch (error) {
      return internalError('DELETE USER FAILED INTERNAL ERROR')
    }
  }
}
