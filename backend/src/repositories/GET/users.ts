import { type IGetRepository } from '../../controllers/GET/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class GetUsersRepository implements IGetRepository<User> {
  async getModels (id?: string): Promise<User[]> {
    if (id !== null && id !== undefined) {
      // If id exists, return the specified user
      const result = await PostgreClient.db.query(`
        SELECT id, firstName, lastName, email, phone FROM users WHERE id = ${id}
      `)
      // Converting rows to users array type
      const data: User[] = result.rows
      return data
    } else {
      // If ID does not exist, return all the users
      const result = await PostgreClient.db.query(`
        SELECT id, firstName, lastName, email, phone FROM users
      `)
      // Converting rows to users array type
      const data: User[] = result.rows
      return data
    }
  }
}
