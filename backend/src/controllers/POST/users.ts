import validator from 'validator'
import { type ICreateController, type ICreateRepository } from './protocols'
import { type User } from '../../models/user'
import { type HTTPRequest, type HTTPResponse } from '../protocols'
import { badRequest, internalError, successfull, voidRequest } from '../helpers'

export class CreateUserController implements ICreateController<User> {
  // Constructor to access the createModel function
  constructor (private readonly createUsersRepository: ICreateRepository<User>) {}
  async handle (httpRequest: HTTPRequest<User>): Promise<HTTPResponse<any | string>> {
    try {
      // Validate if body exists
      if (httpRequest?.body === null || httpRequest?.body === undefined) {
        return voidRequest('Please specify a body')
      }

      // Validate obrigatory parameters
      const requiredFields = ['firstName', 'lastName', 'email', 'password', 'role']
      for (const field of requiredFields) {
        if (!(field in httpRequest.body)) {
          return badRequest(`Field ${field} is required`)
        }
      }

      // Verify if e-mail is valid
      const emailIsValid = validator.isEmail(httpRequest.body.email)
      if (!emailIsValid) {
        return badRequest('Invalid email adress')
      }

      // Validate if e-mail already exists
      const email = httpRequest.body.email

      // Validate if phone number is valid if exits
      if (httpRequest.body.phone !== null && httpRequest.body.phone !== undefined) {
        const isPhoneNumber = validator.isMobilePhone(httpRequest.body.phone)
        if (!isPhoneNumber) {
          return badRequest('Invalid phone number')
        }
      }

      // Verify if role typed exists in system
      const roles = ['admin', 'operational', 'manager']
      const isRoleInRoles = roles.includes(httpRequest.body.role)
      if (!isRoleInRoles) {
        return badRequest('Invalid role')
      }

      // Validate password strongness
      const passwordScore = validator.isStrongPassword(httpRequest.body.password, {
        minLength: 8,
        returnScore: true,
        pointsPerUnique: 0.5,
        pointsPerRepeat: 0,
        pointsForContainingLower: 1,
        pointsForContainingUpper: 3,
        pointsForContainingNumber: 1.5,
        pointsForContainingSymbol: 4
      })
      if (passwordScore <= 13) {
        return badRequest('Password too weak')
      }

      await this.createUsersRepository.createModel(httpRequest.body)

      return successfull('User created successfully')
    } catch (error) {
      return internalError('POST METHOD FAILED: INTERNAL ERROR')
    }
  }
}
