import validator from 'validator'
import { type User } from '../../models/user'
import { PostUserRepository } from '../../repositories/POST/users'
import { badRequest, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { GetUsersRepository } from '../../repositories/GET/users'
import bcrypt from 'bcrypt'

export class PostUserController {
  async register (httpRequest?: HTTPRequest<User>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.body === undefined) {
        return voidRequest('Please specify a body')
      } else {
        const requiredFields: string[] = ['firstName', 'lastName', 'email', 'password']
        for (const field of requiredFields) {
          if (!(field in httpRequest.body)) {
            return badRequest(`Field ${field} is required`)
          }
        }
        const emailIsValid: boolean = validator.isEmail(httpRequest.body.email)
        if (!emailIsValid) {
          return badRequest('Invalid e-mail adress')
        }
        const searchUserWithEmail: Array<Pick<User, 'id' | 'email' | 'password'>> = await new GetUsersRepository().getUsersByEmail(httpRequest.body.email)
        if (searchUserWithEmail.length > 0) {
          return badRequest('User with this e-mail already exists')
        }
        if (httpRequest.body.phone !== undefined && httpRequest.body.phone !== null) {
          const isPhoneNumber = validator.isMobilePhone(httpRequest.body.phone)
          if (!isPhoneNumber) {
            return badRequest('Invalid phone number')
          }
        }
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
        httpRequest.body.password = await bcrypt.hash(httpRequest.body.password, 10)
        await new PostUserRepository().create(httpRequest.body)
        return successfull('User created successfully')
      }
    } catch (error) {
      return internalError('REGISTER USER FAILED INTERNAL ERROR')
    }
  }
}
