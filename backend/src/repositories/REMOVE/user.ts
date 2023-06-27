import { PostgreClient } from '../../database/postgre'

export class RemoveUserRepository {
  async remove (id: number): Promise<void> {
    await PostgreClient.db.query(`
      DELETE FROM users WHERE id = ${id}
    `)
  }
}
