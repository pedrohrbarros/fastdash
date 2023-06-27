import { type Product } from '../../models/product'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { CreateProductRepository } from '../../repositories/CREATE/product'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { headersAuthError, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PostProductController {
  async post (httpRequest: HTTPRequest<Product>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.body === undefined) {
        return voidRequest('Please specify a body')
      } else {
        await new CreateProductRepository().create(httpRequest.body)
        const id = await getIDFromToken(httpRequest.headers.authorization)
        await new CreateLogRepository().create({
          action: 'create product',
          user_id: id
        })
        return successfull('Product created successfully')
      }
    } catch (error) {
      return internalError('CREATE PRODUCT FAILED INTERNAL ERROR')
    }
  }
}
