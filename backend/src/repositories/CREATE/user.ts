import { CREATEUSERPROPERTIES } from '../../controllers/POST/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class CreateUserRepository {
  async create (params: User): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO users (${CREATEUSERPROPERTIES.REGISTER}) VALUES ('${params.firstname}', '${params.lastname}', '${params.email}', '${params.password}', '${params.phone}')`
    )
  }
}
