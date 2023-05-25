import { type ICreateRepository } from '../../controllers/POST/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class CreateUserRepository implements ICreateRepository<User> {
  async createModel (params: User): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO users (firstName, lastName, email, password, phone, role) VALUES ('${params.firstName}', '${params.lastName}', '${params.email}', '${params.password}', '${params.phone}', '${params.role}')`
    )
  }
}
