import { type Product } from '../../models/product'
import { SelectProductRepository } from '../../repositories/SELECT/product'
import { badRequest, badResponse, headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class GetProductController {
  async getAll (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Product[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        const products: Product[] = await new SelectProductRepository().selectAll()
        return successfull(products)
      }
    } catch (error) {
      return internalError('GET PRODUCTS FAILED INTERNAL ERROR')
    }
  }

  async getOne (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Product | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No parameters were given')
      } else {
        const product: Product = await new SelectProductRepository().selectOne(+httpRequest.params.id)
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
