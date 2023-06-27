import validator from 'validator'
import { type User } from '../../models/user'
import { CreateLogRepository } from '../../repositories/CREATE/log'
import { UpdateUserRepository } from '../../repositories/UPDATE/user'
import { getIDFromToken } from '../../tools/getUserFromToken'
import { badRequest, headersAuthError, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'
import { SelectUserRepository } from '../../repositories/SELECT/user'
import bcrypt from 'bcrypt'

export class PatchUserController {
  async patch (httpRequest?: HTTPRequest<Partial<User>>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.body === undefined || httpRequest?.body === null) {
        return voidRequest('Please provide a property to update')
      } else if (httpRequest?.headers?.authorization === undefined) {
        return badRequest('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: User = await new SelectUserRepository().selectOne(id)
        if (user === undefined || user === null) {
          return headersAuthError('User with this token not found')
        }
        if (httpRequest.body.email !== undefined) {
          const emailIsValid: boolean = validator.isEmail(httpRequest.body.email)
          if (!emailIsValid) {
            return badRequest('Invalid e-mail adress')
          }
          const searchUserWithEmail: Array<Pick<User, 'id' | 'email' | 'password'>> = await new SelectUserRepository().selectAllByEmail(httpRequest.body.email)
          if (searchUserWithEmail.length > 0) {
            return badRequest('User with this e-mail already exists')
          }
        }
        if (httpRequest.body.password !== undefined) {
          const passwordScore = validator.isStrongPassword(
            httpRequest.body.password,
            {
              minLength: 8,
              returnScore: true,
              pointsPerUnique: 0.5,
              pointsPerRepeat: 0,
              pointsForContainingLower: 1,
              pointsForContainingUpper: 3,
              pointsForContainingNumber: 1.5,
              pointsForContainingSymbol: 4
            }
          )
          if (passwordScore <= 13) {
            return badRequest('Password too weak')
          }
          httpRequest.body.password = await bcrypt.hash(
            httpRequest.body.password,
            10
          )
        }
        if (httpRequest.body.phone !== undefined) {
          const isPhoneNumber = validator.isMobilePhone(httpRequest.body.phone)
          if (!isPhoneNumber) {
            return badRequest('Invalid phone number')
          }
        }
        await new UpdateUserRepository().update(id, httpRequest.body)
        await new CreateLogRepository().create({
          action: 'update himself',
          user_id: id
        })
        return successfull('User updated successfully')
      }
    } catch (error) {
      return internalError('UPDATE USER FAILED INTERNAL ERROR')
    }
  }
}
