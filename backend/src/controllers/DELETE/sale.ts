import { type Sale } from '../../models/sale'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { RemoveSaleRepository } from '../../repositories/REMOVE/sale'
import { SelectSaleRepository } from '../../repositories/SELECT/sale'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class DeleteSaleController {
  async delete (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        if (httpRequest.params === undefined) {
          return badRequest('No parameters was provided')
        } else {
          const sale: Sale = await new SelectSaleRepository().selectOne(+httpRequest.params.id)
          if (sale === undefined || sale === null) {
            return badRequest('Sale not found')
          }
          await new RemoveSaleRepository().remove(+httpRequest.params.id)
          const id = await getIDFromToken(httpRequest.headers.authorization)
          const user: User = await new SelectUserRepository().selectOne(id)
          if (user === undefined || user === null) {
            return headersAuthError('User with this token not found')
          }
          await new CreateLogRepository().create({
            action: 'remove sale',
            user_id: id
          })
          return successfull('Sale deleted successfully')
        }
      }
    } catch (error) {
      return internalError('DELETE SALE FAILED INTERNAL ERROR')
    }
  }
}
