import { type Seller } from '../../models/seller'
import { SelectSellerRepository } from '../../repositories/SELECT/seller'
import { badRequest, badResponse, headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class GetSellerController {
  async getAll (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Seller[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('Not authorized')
      } else {
        const sellers: Seller[] = await new SelectSellerRepository().selectAll()
        return successfull(sellers)
      }
    } catch (error) {
      return internalError('GET SELLERS FAILED INTERNAL ERROR')
    }
  }

  async getOne (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Seller | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No parameters were given')
      } else {
        const seller: Seller = await new SelectSellerRepository().selectOne(+httpRequest.params.id)
        if (seller === undefined || seller === null) {
          return badResponse('Seller does not exist')
        } else {
          return successfull(seller)
        }
      }
    } catch (error) {
      return internalError('GET SELLER FAILED INTERNAL ERROR')
    }
  }
}
