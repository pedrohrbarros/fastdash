import { type CreateUserPrams, type ICreateUserRepository } from '../../controllers/Users/POST/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class PostgreSQLCreateUser implements ICreateUserRepository {
  async createUser (params: CreateUserPrams): Promise<User> {
    // Return ID to check if the user was created
    const result = await PostgreClient.db.query(
      `INSERT INTO user(firstName, lastName, email, password, phone)
      VALUES (${params.firstName}, ${params.lastName}, ${params.email}, ${params.password}, ${params.phone})
      RETURNING id`
    )
    const insertedId: string = result.rows[0]
    const userResult = await PostgreClient.db.query(`SELECT * FROM user WHERE id = ${insertedId}`)
    const user: User = userResult.rows[0]
    if (user.id === null) {
      throw new Error('User not created')
    }
    return user
  }
}
