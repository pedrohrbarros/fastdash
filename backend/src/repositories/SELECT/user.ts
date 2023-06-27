import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class SelectUserRepository {
  async selectAll (): Promise<User[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM users
    `)
    const data: User[] = result.rows
    return data
  }

  async selectOne (id: number): Promise<User> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM users WHERE id = ${id}
    `)
    const data: User[] = result.rows
    return data[0]
  }

  async selectAllByEmail (email: string): Promise<User[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    )
    const data: User[] = result.rows
    return data
  }
}
