import { type Product } from '../../models/product'
import { type User } from '../../models/user'
import { SelectProductRepository } from '../../repositories/SELECT/product'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getIDFromToken'
import {
  badRequest,
  badResponse,
  headersAuthError,
  internalError,
  successfull
} from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class GetProductController {
  async getAll (
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Product[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        const products: Product[] =
          await new SelectProductRepository().selectAll()
        return successfull(products)
      }
    } catch (error) {
      return internalError('GET PRODUCTS FAILED INTERNAL ERROR')
    }
  }

  async getOne (
    httpRequest: HTTPRequest<void>
  ): Promise<HTTPResponse<Product | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No parameters were given')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        const product: Product = await new SelectProductRepository().selectOne(
          +httpRequest.params.id
        )
        if (product === undefined || product === null) {
          return badResponse('Product does not exist')
        } else {
          return successfull(product)
        }
      }
    } catch (error) {
      return internalError('GET PRODUCT FAILED INTERNAL ERROR')
    }
  }
}
