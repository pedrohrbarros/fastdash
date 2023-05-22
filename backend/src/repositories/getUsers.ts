import { type IGetUsersData } from '../controllers/getUsers/protocols'
import { type User } from '../models/user'

export class PostgreSQLGetUsersData implements IGetUsersData {
  async getUsers (): Promise<User[]> {
    return [
      {
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    ]
  }
}
