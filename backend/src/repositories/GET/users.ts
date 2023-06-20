import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'
import { USERPROPERTIES } from '../../controllers/GET/protocols'

export class GetUsersRepository {
  async getList (): Promise<User[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`SELECT ${USERPROPERTIES.LIST} FROM users`)
    const data: User[] = result.rows
    return data
  }

  async getProfile (id: string): Promise<User> {
    const result: QueryResult<any> = await PostgreClient.db.query(`SELECT ${USERPROPERTIES.PROFILE} FROM users WHERE id = ${id}`)
    const data: User[] = result.rows
    return data[0]
  }

  async getUsersByEmail (email: string): Promise<Array<Pick<User, 'id' | 'email' | 'password'>>> {
    const result: QueryResult<any> = await PostgreClient.db.query(`SELECT ${USERPROPERTIES.LOGIN} FROM users WHERE email = '${email}'`)
    const data: Array<Pick<User, 'id' | 'email' | 'password'>> = result.rows
    return data
  }

  async getUserByID (id: string): Promise<Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>> {
    const result: QueryResult<any> = await PostgreClient.db.query(`SELECT ${USERPROPERTIES.PROFILE} FROM users WHERE id = ${id}`)
    const data: User[] = result.rows
    return data[0]
  }
}
