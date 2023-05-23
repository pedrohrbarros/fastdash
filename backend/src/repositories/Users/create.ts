import { type CreateUserParams, type ICreateUserRepository } from '../../controllers/Users/POST/protocols'
import { PostgreClient } from '../../database/postgre'

export class PostgreSQLCreateUserRepository implements ICreateUserRepository {
  async createUser (params: CreateUserParams): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO users (firstName, lastName, email, password, phone) VALUES ('${params.firstName}', '${params.lastName}', '${params.email}', '${params.password}', '${params.phone}')`
    )
  }
}
