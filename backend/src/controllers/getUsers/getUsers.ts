import { type IGetUsersData, type IGetUsersController } from './protocols'

export class GetUsersController implements IGetUsersController {
  constructor (private readonly getUsersData: IGetUsersData) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async handle () {
    try {
      const users = await this.getUsersData.getUsers()
      return {
        statusCode: 200,
        body: users
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.'
      }
    }
  }
}
