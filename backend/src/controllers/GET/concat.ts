import { type Concat } from '../../models/concat'
import { type User } from '../../models/user'
import { SelectConcatRepository } from '../../repositories/SELECT/concat'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import { getIDFromToken } from '../../tools/getIDFromToken'
import { headersAuthError, internalError, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'

export class GetConcatController {
  async getAll (httpRequest: HTTPRequest<void>): Promise<HTTPResponse<Concat[] | string>> {
    try {
      if (httpRequest.headers?.authorization === undefined) {
        return headersAuthError('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        } else {
          const concats: Concat[] = await new SelectConcatRepository().selectAll()
          return successfull(concats)
        }
      }
    } catch (error) {
      return internalError('GET DATA CONCAT FAILED INTERNAL ERROR')
    }
  }
}
