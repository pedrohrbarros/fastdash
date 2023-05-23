import validator from 'validator'
import { type User } from '../../../models/user'
import { type HTTPRequest, type HTTPResponse } from '../../protocols'
import { type ICreateUserRepository, type ICreateUserController, type CreateUserParams } from './protocols'

export class CreateUserControler implements ICreateUserController {
  constructor (private readonly createUserRepository: ICreateUserRepository) {}
  async handle (httpRequest: HTTPRequest<CreateUserParams>): Promise<HTTPResponse<User>> {
    try {
      // Validate if body exists
      if (httpRequest.body === null || httpRequest.body === undefined) {
        return {
          statusCode: 400,
          body: 'Please specify a valid body'
        }
      }

      // Validate obrigatory parameters
      const requiredFields = ['firstName', 'lastName', 'email', 'password', 'role']

      for (const field of requiredFields) {
        if ((httpRequest?.body?.[field as keyof CreateUserParams]?.length) == null) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`
          }
        }
      }

      // Verify if e-mail is valid
      const emailIsValid = validator.isEmail(httpRequest.body.email)
      if (emailIsValid === false) {
        return {
          statusCode: 400,
          body: 'Invalid email adress'
        }
      }

      // Verify if role typed exists in system
      const roles = ['admin', 'operational', 'manager']
      const isRoleInRoles = roles.includes(httpRequest.body.role)
      if (!isRoleInRoles) {
        return {
          statusCode: 400,
          body: 'Invalid role'
        }
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
      if (passwordScore <= 15) {
        return {
          statusCode: 400,
          body: 'Password too weak'
        }
      }

      await this.createUserRepository.createUser(httpRequest.body)
      return {
        statusCode: 201,
        body: 'User created'
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      }
    }
  }
}
