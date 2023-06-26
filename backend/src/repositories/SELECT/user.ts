import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'
import { SELECTUSERPROPERTIES } from '../../controllers/GET/protocols'

export class SelectUserRepository {
  async selectAll (): Promise<Array<Pick<User, 'firstname' | 'lastname' | 'email'>>> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${SELECTUSERPROPERTIES.LIST} FROM users`
    )
    const data: Array<Pick<User, 'firstname' | 'lastname' | 'email'>> = result.rows
    return data
  }

  async selectOne (id: string): Promise<Pick<User, 'firstname' | 'lastname' | 'email' | 'phone'>> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${SELECTUSERPROPERTIES.PROFILE} FROM users WHERE id = ${id}`
    )
    const data: User[] = result.rows
    return data[0]
  }

  async selectAllByEmail (
    email: string
  ): Promise<Array<Pick<User, 'id' | 'email' | 'password'>>> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${SELECTUSERPROPERTIES.LOGIN} FROM users WHERE email = '${email}'`
    )
    const data: Array<Pick<User, 'id' | 'email' | 'password'>> = result.rows
    return data
  }

  async selectOneById (
    id: string
  ): Promise<Pick<User, 'firstname' | 'lastname' | 'email' | 'phone'>> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${SELECTUSERPROPERTIES.PROFILE} FROM users WHERE id = ${id}`
    )
    const data: User[] = result.rows
    return data[0]
  }
}
