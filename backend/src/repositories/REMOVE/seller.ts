import { PostgreClient } from '../../database/postgre'

export class RemoveSellerRepository {
  async remove (id: number): Promise<void> {
    await PostgreClient.db.query(`
      DELETE FROM sellers WHERE id = ${id}
    `)
  }
}
