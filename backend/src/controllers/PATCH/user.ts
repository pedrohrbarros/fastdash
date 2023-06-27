import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { UpdateUserRepository } from '../../repositories/UPDATE/user'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PatchUserController {
  async patch (httpRequest?: HTTPRequest<Partial<User>>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.body === undefined || httpRequest?.body === null) {
        return voidRequest('Please provide a property to update')
      } else if (httpRequest?.headers?.authorization === undefined) {
        return badRequest('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        await new UpdateUserRepository().update(id, httpRequest.body)
        await new CreateLogRepository().create({
          action: 'update himself',
          user_id: id
        })
        return successfull('User updated successfully')
      }
    } catch (error) {
      return internalError('UPDATE USER FAILED INTERNAL ERROR')
    }
  }
}
