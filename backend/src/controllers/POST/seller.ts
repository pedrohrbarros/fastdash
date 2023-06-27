import { type Seller } from '../../models/seller'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { CreateSellerRepository } from '../../repositories/CREATE/seller'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { headersAuthError, voidRequest, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PostSellerController {
  async post (httpRequest: HTTPRequest<Seller>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.body === undefined) {
        return voidRequest('Please specify a body')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        await new CreateSellerRepository().create(httpRequest.body)
        await new CreateLogRepository().create({
          action: 'create seller',
          user_id: id
        })
        return successfull('Seller created successfully')
      }
    } catch (error) {
      return internalError('CREATE SELLER FAILED INTERNAL ERROR')
    }
  }
}
