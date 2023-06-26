import { PostgreClient } from '../../database/postgre'

interface RawSaleDb {
  id: string
  product_id: string
  seller_id: string
}

export class UpdateSaleRepository {
  async update (id: string, params: Partial<RawSaleDb>): Promise<void> {
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
