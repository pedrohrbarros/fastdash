import { type Product } from '../../models/product'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { RemoveProductRepository } from '../../repositories/REMOVE/product'
import { SelectProductRepository } from '../../repositories/SELECT/product'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getIDFromToken'
import {
  badRequest,
  headersAuthError,
  internalError,
  successfull
} from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class DeleteProductController {
  async delete (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        if (httpRequest.params === undefined) {
          return badRequest('No parameters was provided')
        } else {
          const product: Product =
            await new SelectProductRepository().selectOne(
              +httpRequest.params.id
            )
          if (product === undefined || product === null) {
            return badRequest('Product not found')
          }
          await new RemoveProductRepository().remove(+httpRequest.params.id)
          const id = await getIDFromToken(httpRequest.headers.authorization)
          const user: User = await new SelectUserRepository().selectOne(id)
          if (user === undefined || user === null) {
            return headersAuthError('User with this token not found')
          }
          await new CreateLogRepository().create({
            action: 'remove product',
            user_id: id
          })
          return successfull('Product deleted successfully')
        }
      }
    } catch (error) {
      return internalError('DELETE PRODUCT FAILED INTERNAL ERROR')
    }
  }
}
