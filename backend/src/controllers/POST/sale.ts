import { type Sale } from '../../models/sale'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { CreateSaleRepository } from '../../repositories/CREATE/sale'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getIDFromToken'
import {
  headersAuthError,
  internalError,
  successfull,
  voidRequest
} from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PostSaleController {
  async post (httpRequest: HTTPRequest<Sale>): Promise<HTTPResponse<string>> {
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
        } else {
          await new CreateSaleRepository().create(httpRequest.body)
          await new CreateLogRepository().create({
            action: 'create sale',
            user_id: id
          })
          return successfull('Sale successfuly created')
        }
      }
    } catch (error) {
      return internalError('CREATE SALE FAILED INTERNAL ERROR')
    }
  }
}
