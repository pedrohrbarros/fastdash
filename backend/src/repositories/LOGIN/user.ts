import { type ILoginRepository } from '../../controllers/LOGIN/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class LoginUserRepository implements ILoginRepository<Pick<User, 'id' | 'email' | 'password'>> {
  async loginModel (email: string): Promise<Array<Pick<User, 'id' | 'email' | 'password'>>> {
    const result = await PostgreClient.db.query(`
      SELECT id, email, password FROM users WHERE email = '${email}'
    `)
    const data: Array<Pick<User, 'id' | 'email' | 'password'>> = result.rows
    return data
  }
}
