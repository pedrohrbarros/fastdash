import { type QueryResult } from "pg";
import { PostgreClient } from "../../database/postgre";
import { type User } from "../../models/user";
import { GETUSERPROPERTIES } from "../../controllers/GET/protocols";

export class GetUsersRepository {
  async getList(): Promise<User[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${GETUSERPROPERTIES.LIST} FROM users`
    );
    const data: User[] = result.rows;
    return data;
  }

  async getProfile(id: string): Promise<User> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${GETUSERPROPERTIES.PROFILE} FROM users WHERE id = ${id}`
    );
    const data: User[] = result.rows;
    return data[0];
  }

  async getUsersByEmail(
    email: string
  ): Promise<Array<Pick<User, "id" | "email" | "password">>> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${GETUSERPROPERTIES.LOGIN} FROM users WHERE email = '${email}'`
    );
    const data: Array<Pick<User, "id" | "email" | "password">> = result.rows;
    return data;
  }

  async getUserByID(
    id: string
  ): Promise<Pick<User, "firstname" | "lastName" | "email" | "phone">> {
    const result: QueryResult<any> = await PostgreClient.db.query(
      `SELECT ${GETUSERPROPERTIES.PROFILE} FROM users WHERE id = ${id}`
    );
    const data: User[] = result.rows;
    return data[0];
  }
}
