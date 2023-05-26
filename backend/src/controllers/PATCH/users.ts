import { type User } from '../../models/user'
import validator from 'validator'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { type IUpdateController, type IUpdateRepository } from './protocols'
import { badPermission, badRequest, internalError, successfull, voidRequest } from '../helpers'

export class UpdateUserController implements IUpdateController<User> {
  constructor (private readonly updateUserRepository: IUpdateRepository<Partial<User>>) {}
  async handle (httpRequest: HTTPRequest<Partial<User>>): Promise<HTTPResponse<string>> {
    try {
      // Check if the id was given in the parameters
      if (httpRequest?.params?.id === null || httpRequest?.params?.id === undefined) {
        return badRequest('Please specify a user ID to update')
      }
      // Verify if body is empty
      if (httpRequest?.body === null || httpRequest.body === undefined) {
        return voidRequest('Please specify some property to change')
      }
      if (httpRequest?.permission === null || httpRequest?.permission === undefined) {
        return badRequest('Please specify a permission to update user')
      }

      // Admin: Can change all informations
      // Manager: Can change all informations except role
      // Operational: Can change only first name and last name
      // Verify if manager is trying to change role to administratos
      if (httpRequest?.permission === 'manager' && httpRequest?.body?.role === 'admin') {
        return badPermission('Not authorized, manager does not have all the permissions required')
      }
      // Check if operational level is trying to not required properties
      if (httpRequest?.permission === 'operational' && (
        httpRequest?.body?.role !== undefined ||
        httpRequest?.body?.phone !== undefined ||
        httpRequest?.body?.password !== undefined ||
        httpRequest?.body?.email !== undefined
      )) {
        return badPermission('Not authorized, this user has to update only his first name and/or last name')
      }

      // Verify if e-mail is valid
      if (httpRequest.body.email !== undefined && httpRequest.body.email !== null) {
        const emailIsValid = validator.isEmail(httpRequest?.body?.email)
        if (!emailIsValid) {
          return badRequest('Invalid email adress')
        }
      }

      // Validate if phone number is valid if exits
      if (httpRequest.body.phone !== null && httpRequest.body.phone !== undefined) {
        const isPhoneNumber = validator.isMobilePhone(httpRequest.body.phone)
        if (!isPhoneNumber) {
          return badRequest('Invalid phone number')
        }
      }

      // Verify if role typed exists in system
      if (httpRequest.body.role !== undefined && httpRequest.body.role !== null) {
        const roles = ['admin', 'operational', 'manager']
        const isRoleInRoles = roles.includes(httpRequest.body.role)
        if (!isRoleInRoles) {
          return badRequest('Invalid role')
        }
      }

      // Validate password strongness
      if (httpRequest.body.password !== undefined && httpRequest.body.password !== null) {
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
      }

      await this.updateUserRepository.updateModel(httpRequest.params.id, httpRequest.body)
      return successfull('Successfully updated')
    } catch (error) {
      return internalError('PATCH METHOD FAILED: INTERNAL ERROR')
    }
  }
}
