import { type IDeleteRepository } from '../../controllers/DELETE/protocols'
import { PostgreClient } from '../../database/postgre'

export class DeleteUserRepository implements IDeleteRepository {
  async deleteModel (id: string): Promise<void> {
    await PostgreClient.db.query(`
      DELETE FROM users WHERE id = '${id}'
    `)
  }
}
