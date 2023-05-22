import { type IGetUsersData } from '../controllers/getUsers/protocols'
import { PostgreClient } from '../database/postgre'
import { type User } from '../models/user'

export class PostgreSQLGetUsersData implements IGetUsersData {
  async getUsers (): Promise<User[]> {
    const users = await PostgreClient.db.query<User>('SELECT * FROM users')
    users[0].id
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
