import { type IGetUsersData } from '../controllers/Users/GET/protocols'
import { PostgreClient } from '../database/postgre'
import { type User } from '../models/user'

// Fetching the users with the client and inserting them into the interface of GetUsersData to return the list of the users according to the Users type

export class PostgreSQLGetUsersData implements IGetUsersData {
  async getUsers (): Promise<User[]> {
    // Selecting all the users in the database
    const result = await PostgreClient.db.query<User>(
      'SELECT * FROM users'
    )
    // Converting the rows to users array type
    const users: User[] = result.rows
    return users
  }
}
