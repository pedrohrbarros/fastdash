import { type Product } from '../../models/product'
import { type Sale } from '../../models/sale'
import { type Seller } from '../../models/seller'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { CreateSaleRepository } from '../../repositories/CREATE/sale'
import { SelectProductRepository } from '../../repositories/SELECT/product'
import { SelectSellerRepository } from '../../repositories/SELECT/seller'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class PostSaleController {
  async post (httpRequest: HTTPRequest<Sale>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else if (httpRequest.body === undefined) {
        return voidRequest('Please specify a body')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        const product: Product = await new SelectProductRepository().selectOne(+httpRequest.body.product_id)
        const seller: Seller = await new SelectSellerRepository().selectOne(+httpRequest.body.seller_id)
        if ((product === undefined || product === null) || (seller === undefined || seller === null)) {
          return badRequest('Please specify a valid seller and product')
        } else {
          await new CreateSaleRepository().create(httpRequest.body)
          await new CreateLogRepository().create({
            action: 'create sale',
            user_id: id
          })
          return successfull('Sale successfuly created')
        }
      }
    } catch (error) {
      return internalError('CREATE SALE FAILED INTERNAL ERROR')
    }
  }
}
