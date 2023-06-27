import { type Seller } from '../../models/seller'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { CreateSellerRepository } from '../../repositories/CREATE/seller'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { headersAuthError, voidRequest, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PostSellerController {
  async post (httpRequest: HTTPRequest<Seller>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.body === undefined) {
        return voidRequest('Please specify a body')
      } else {
        await new CreateSellerRepository().create(httpRequest.body)
        const id = await getIDFromToken(httpRequest.headers.authorization)
        await new CreateLogRepository().create({
          action: 'create seller',
          user_id: id
        })
        return successfull('Seller created successfully')
      }
    } catch (error) {
      return internalError('CREATE SELLER FAILED INTERNAL ERROR')
    }
  }
}
