import { CreateLogRepository } from '../../repositories/CREATE/log'
import { RemoveProductRepository } from '../../repositories/REMOVE/product'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull } from '../helpers'
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
          await new RemoveProductRepository().remove(+httpRequest.params.id)
          const id = await getIDFromToken(httpRequest.headers.authorization)
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
