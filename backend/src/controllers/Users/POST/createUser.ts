import { type User } from '../../../models/user'
import { type HTTPRequest, type HTTPResponse } from '../../protocols'
import { type ICreateUserRepository, type ICreateUserController, type CreateUserParams } from './protocols'

export class CreateUserControler implements ICreateUserController {
  constructor (private readonly createUserRepository: ICreateUserRepository) {}
  async handle (httpRequest: HTTPRequest<CreateUserParams>): Promise<HTTPResponse<User>> {
    try {
      // Validate if body existes because its optional

      if (httpRequest.body == null) {
        return {
          statusCode: 400,
          body: 'Please specify a body'
        }
      }

      const user = await this.createUserRepository.createUser(httpRequest.body)
      return {
        statusCode: 201,
        body: user
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
