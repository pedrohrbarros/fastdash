import { type Sale } from '../../models/sale'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { SelectSaleRepository } from '../../repositories/SELECT/sale'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { UpdateSaleRepository } from '../../repositories/UPDATE/sale'
import { getIDFromToken } from '../../tools/getIDFromToken'
import {
  badRequest,
  headersAuthError,
  internalError,
  successfull,
  voidRequest
} from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'

export class PatchSaleController {
  async patch (
    httpRequest: HTTPRequest<Partial<Sale>>
  ): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.body === undefined) {
        return voidRequest('Please provide a property to update')
      } else if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No sale was given to update')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        const sale: Sale = await new SelectSaleRepository().selectOne(
          +httpRequest.params.id
        )
        if (sale === undefined || sale === null) {
          return badRequest('Sale not found')
        }
        await new UpdateSaleRepository().update(
          +httpRequest.params.id,
          httpRequest.body
        )
        await new CreateLogRepository().create({
          action: 'update sale',
          user_id: id
        })
        return successfull('Sale updated successfully')
      }
    } catch (error) {
      return internalError('UPDATE SALE FAILED INTERNAL ERROR')
    }
  }
}
