import { PostgreClient } from '../../database/postgre'

export class DeleteUserRepository {
  async delete (id: string): Promise<void> {
    await PostgreClient.db.query(`
      DELETE FROM users WHERE id = '${id}'
    `)
  }
}
