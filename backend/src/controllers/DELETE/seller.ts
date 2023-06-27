import { type Seller } from '../../models/seller'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { RemoveSellerRepository } from '../../repositories/REMOVE/seller'
import { SelectSellerRepository } from '../../repositories/SELECT/seller'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class DeleteSellerController {
  async delete (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        if (httpRequest.params === undefined) {
          return badRequest('No parameters was provided')
        } else {
          const seller: Seller = await new SelectSellerRepository().selectOne(+httpRequest.params.id)
          if (seller === undefined || seller === null) {
            return badRequest('Product not found')
          }
          await new RemoveSellerRepository().remove(+httpRequest.params.id)
          const id = await getIDFromToken(httpRequest.headers.authorization)
          await new CreateLogRepository().create({
            action: 'remove seller',
            user_id: id
          })
          return successfull('Seller deleted successfully')
        }
      }
    } catch (error) {
      return internalError('DELETE SELLER FAILED INTERNAL ERROR')
    }
  }
}
