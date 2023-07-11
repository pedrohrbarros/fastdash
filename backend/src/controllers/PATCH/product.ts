import { type Product } from '../../models/product'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { SelectProductRepository } from '../../repositories/SELECT/product'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { UpdateProductRepository } from '../../repositories/UPDATE/product'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PatchProductController {
  async patch (httpRequest: HTTPRequest<Partial<Product>>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.body === undefined) {
        return voidRequest('Please provide a property to update')
      } else if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No product was given to update')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        const product: Product = await new SelectProductRepository().selectOne(+httpRequest.params.id)
        if (product === undefined || product === null) {
          return badRequest('Product not found')
        }
        await new UpdateProductRepository().update(+httpRequest.params.id, httpRequest.body)
        await new CreateLogRepository().create({
          action: 'update product',
          user_id: id
        })
        return successfull('Product updated successfully')
      }
    } catch (error) {
      return internalError('UPDATE PRODUCT FAILED INTERNAL ERROR')
    }
  }
}
