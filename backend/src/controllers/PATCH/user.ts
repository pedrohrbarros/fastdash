import { type IncomingHttpHeaders } from 'http'
import { type User } from '../../models/user'
import { UpdateUserRepository } from '../../repositories/PATCH/users'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class UpdateUserController {
  async patch (httpRequest?: HTTPRequest<IncomingHttpHeaders & Partial<User>>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.body === undefined || httpRequest?.body === null) {
        return voidRequest('Please provide an property to update')
      } else if (httpRequest?.headers?.authorization === undefined) {
        return badRequest('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        await new UpdateUserRepository().update(id, httpRequest.body)
        return successfull('User updated successfully')
      }
    } catch (error) {
      return internalError('UPDATE USER FAILED INTERNAL ERROR')
    }
  }
}
