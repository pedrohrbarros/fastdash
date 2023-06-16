import { type User } from '../../models/user'
import { type ILoginRepository } from '../LOGIN/protocols'
import { badRequest, badResponse, internalError, successfull, voidRequest } from '../helpers'
import { type HTTPResponse, type HTTPRequest } from '../protocols'
import { type ILoginController } from './protocols'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginUserController implements ILoginController<Pick<User, 'email' | 'password'>> {
  constructor (private readonly loginUserRepository: ILoginRepository<Pick<User, 'email' | 'password'>>) {}

  async handle (httpRequest: HTTPRequest<Pick<User, 'email' | 'password'>>): Promise<HTTPResponse<string>> {
    try {
      if (httpRequest?.body === null || httpRequest?.body === undefined) {
        return voidRequest('Please specify the e-mail adress and password')
      }
      if (httpRequest?.body?.email === null || httpRequest?.body?.email === undefined) {
        return voidRequest('Please specify an e-mail adress to login')
      }
      if (httpRequest?.body?.password === null || httpRequest?.body?.password === undefined) {
        return voidRequest('Please specify an password to login')
      }

      const email = httpRequest.body.email
      const password = httpRequest.body.password
      const users: Array<Pick<User, 'email' | 'password'>> = await this.loginUserRepository.loginModel(email)
      if (users?.length === 0 || users === undefined) {
        return badRequest('User not found with this e-mail adress')
      } else if (users.length > 1) {
        return badResponse('More than one user with this e-mail adress')
      } else {
        const verifyPassword = await bcrypt.compare(password, users[0].password)
        if (!verifyPassword) {
          return badRequest('Wrong password')
        }
        const token = jwt.sign()
      }
    } catch (error) {
      return internalError('LOGIN METHOD FAILED: INTERNAL ERROR')
    }
  }
}
