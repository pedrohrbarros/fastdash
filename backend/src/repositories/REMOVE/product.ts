import { PostgreClient } from '../../database/postgre'

export class RemoveProductRepository {
  async remove (id: string): Promise<void> {
    await PostgreClient.db.query(`
      DELETE FROM products WHERE id = '${id}'
    `)
  }
}
