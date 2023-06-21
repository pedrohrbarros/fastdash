import { type IncomingHttpHeaders } from 'http'
import { type User } from '../../models/user'
import { GetUsersRepository } from '../../repositories/GET/users'
import { badRequest, badResponse, internalError, noContent, successfull } from '../helpers'
import { type HTTPRequest, type HTTPResponse } from '../protocols'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getIDFromToken } from '../../tools/getUserFromToken'

export class GetUserController {
  async get (httpRequest?: HTTPRequest<IncomingHttpHeaders>): Promise<HTTPResponse<User[] | string>> {
    try {
      if (httpRequest?.headers?.access === undefined) {
        return badRequest('Not authorized')
      }
      const users: User[] = await new GetUsersRepository().getList()
      if (users.length === 0) {
        return noContent('No users were found')
      } else {
        return successfull(users)
      }
    } catch (error) {
      return internalError('GET LIST USERS FAILED INTERNAL ERROR')
    }
  }

  async login (httpRequest?: HTTPRequest<Pick<User, 'email' | 'password'> & IncomingHttpHeaders>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.headers?.access === undefined) {
        return badRequest('Not authorized')
      }
      if (httpRequest?.body?.email === undefined && httpRequest?.body?.password === undefined) {
        return badRequest('Please provida a valid e-mail adress and password')
      } else {
        const users: Array<Pick<User, 'id' | 'email' | 'password'>> = await new GetUsersRepository().getUsersByEmail(httpRequest?.body?.email)
        if (users.length > 1) {
          return badResponse('More than one user was found')
        } else if (users.length === 0) {
          return badRequest('No users found with this e-mail adress')
        } else {
          const verifyPass: boolean = await bcrypt.compare(httpRequest?.body?.password, users[0].password)
          if (!verifyPass) {
            return badRequest('Wrong password')
          } else {
            const token: string = jwt.sign({ id: users[0].id }, process.env.JWT_PASSWORD ?? '', { expiresIn: '8h' })
            return successfull(token)
          }
        }
      }
    } catch (error) {
      return internalError('LOGIN USER FAILED INTERNAL ERROR')
    }
  }

  async getProfile (httpRequest?: HTTPRequest<IncomingHttpHeaders>): Promise<HTTPResponse<Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'> | string>> {
    try {
      if (httpRequest?.headers?.authorization === undefined) {
        return badRequest('User not authenticated')
      } else {
        const id = await getIDFromToken(httpRequest.headers.authorization)
        const user: Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'> = await new GetUsersRepository().getUserByID(id)
        if (user === undefined || user === null) {
          return badRequest('User does not exist')
        } else {
          return successfull(user)
        }
      }
    } catch (error) {
      return internalError('GET PROFILE FAILED INTERNAL ERROR')
    }
  }
}
