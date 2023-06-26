import validator from 'validator'
import { type User } from '../../models/user'
import { PostUserRepository } from '../../repositories/POST/users'
import {
  badRequest,
  badResponse,
  internalError,
  successfull,
  voidRequest
} from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { GetUsersRepository } from '../../repositories/GET/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class PostUserController {
  async register (
    httpRequest?: HTTPRequest<User>
  ): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.headers?.access !== process.env.ACCESS_TOKEN) {
        return badRequest('Not authorized')
      }
      if (httpRequest?.body === undefined) {
        return voidRequest('Please specify a body')
      } else {
        const requiredFields: string[] = [
          'firstname',
          'lastName',
          'email',
          'password'
        ]
        for (const field of requiredFields) {
          if (!(field in httpRequest.body)) {
            return badRequest(`Field ${field} is required`)
          }
        }
        const emailIsValid: boolean = validator.isEmail(httpRequest.body.email)
        if (!emailIsValid) {
          return badRequest('Invalid e-mail adress')
        }
        const searchUserWithEmail: Array<
        Pick<User, 'id' | 'email' | 'password'>
        > = await new GetUsersRepository().getUsersByEmail(
          httpRequest.body.email
        )
        if (searchUserWithEmail.length > 0) {
          return badRequest('User with this e-mail already exists')
        }
        if (
          httpRequest.body.phone !== undefined &&
          httpRequest.body.phone !== null
        ) {
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
        httpRequest.body.password = await bcrypt.hash(
          httpRequest.body.password,
          10
        )
        await new PostUserRepository().create(httpRequest.body)
        return successfull('User created successfully')
      }
    } catch (error) {
      return internalError('REGISTER USER FAILED INTERNAL ERROR')
    }
  }

  async login (
    httpRequest?: HTTPRequest<Pick<User, 'email' | 'password'>>
  ): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.headers?.access !== process.env.ACCESS_TOKEN) {
        return badRequest('Not authorized')
      }
      if (
        httpRequest?.body?.email === undefined &&
        httpRequest?.body?.password === undefined
      ) {
        return badRequest('Please provide a valid e-mail adress and password')
      } else {
        const users: Array<Pick<User, 'id' | 'email' | 'password'>> =
          await new GetUsersRepository().getUsersByEmail(
            httpRequest?.body?.email
          )
        if (users.length > 1) {
          return badResponse('More than one user was found')
        } else if (users.length === 0) {
          return badRequest('No users found with this e-mail adress')
        } else {
          const verifyPass: boolean = await bcrypt.compare(
            httpRequest?.body?.password,
            users[0].password
          )
          if (!verifyPass) {
            return badRequest('Wrong password')
          } else {
            const token: string = jwt.sign(
              { id: users[0].id },
              process.env.JWT_PASSWORD ?? '',
              { expiresIn: '8h' }
            )
            return successfull(token)
          }
        }
      }
    } catch (error) {
      return internalError('LOGIN USER FAILED INTERNAL ERROR')
    }
  }
}
