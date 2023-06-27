import { PostgreClient } from '../../database/postgre'
import { type Sale } from '../../models/sale'

export class UpdateSaleRepository {
  async update (id: number, params: Partial<Sale>): Promise<void> {
    const query: string[] = []
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.push(`${key} = '${value}'`)
      }
    })
    await PostgreClient.db.query(`
      UPDATE products SET ${query.join(', ')} WHERE id = ${id}
    `)
  }
}
