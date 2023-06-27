import { PostgreClient } from '../../database/postgre'

export class RemoveSaleRepository {
  async remove (id: number): Promise<void> {
    await PostgreClient.db.query(`
      DELETE FROM sales WHERE id = ${id}
    `)
  }
}
