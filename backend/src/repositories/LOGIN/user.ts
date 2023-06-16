import { type ILoginRepository } from '../../controllers/LOGIN/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class LoginUserRepository implements ILoginRepository<Pick<User, 'email' | 'password'>> {
  async loginModel (email: string): Promise<Array<Pick<User, 'email' | 'password'>>> {
    const result = await PostgreClient.db.query(`
      SELECT email, password FROM users WHERE email = '${email}'
    `)
    const data: Array<Pick<User, 'email' | 'password'>> = result.rows
    return data
  }
}
