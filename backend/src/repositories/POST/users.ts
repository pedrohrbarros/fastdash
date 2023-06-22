import { POSTUSERPROPERTIES } from "../../controllers/POST/protocols";
import { PostgreClient } from "../../database/postgre";
import { type User } from "../../models/user";

export class PostUserRepository {
  async create(params: User): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO users (${POSTUSERPROPERTIES.REGISTER}) VALUES ('${params.firstname}', '${params.lastName}', '${params.email}', '${params.password}', '${params.phone}')`
    );
  }
}
