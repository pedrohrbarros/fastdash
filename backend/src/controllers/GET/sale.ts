import { type Sale } from '../../models/sale'
import { SelectSaleRepository } from '../../repositories/SELECT/sale'
import { badRequest, badResponse, headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class GetSaleController {
  async getAll (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Sale[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        const sales: Sale[] = await new SelectSaleRepository().selectAll()
        return successfull(sales)
      }
    } catch (error) {
      return internalError('GET SALES FAILED INTERNAL ERROR')
    }
  }

  async getOne (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Sale | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.params === undefined) {
        return badRequest('No parameters were given')
      } else {
        const sale: Sale = await new SelectSaleRepository().selectOne(+httpRequest.params.id)
        if (sale === undefined || sale === null) {
          return badResponse('Sale does not exist')
        } else {
          return successfull(sale)
        }
      }
    } catch (error) {
      return internalError('GET SALE FAILED INTERNAL ERROR')
    }
  }
}
