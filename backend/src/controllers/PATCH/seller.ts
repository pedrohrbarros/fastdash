import { type Seller } from '../../models/seller'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { UpdateSellerRepository } from '../../repositories/UPDATE/seller'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PatchSellerController {
  async patch (httpRequest: HTTPRequest<Partial<Seller>>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.body === undefined) {
        return voidRequest('Please provide a property to update')
      } else if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No seller was given to update')
      } else {
        await new UpdateSellerRepository().update(+httpRequest.params.id, httpRequest.body)
        const id = await getIDFromToken(httpRequest.headers.authorization)
        await new CreateLogRepository().create({
          action: 'update seller',
          user_id: id
        })
        return successfull('Seller updated successfully')
      }
    } catch (error) {
      return internalError('UPDATE SELLER FAILED INTERNAL ERROR')
    }
  }
}
