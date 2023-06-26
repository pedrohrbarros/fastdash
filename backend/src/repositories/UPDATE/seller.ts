import { PostgreClient } from '../../database/postgre'
import { type Seller } from '../../models/seller'

export class UpdateSellerRepository {
  async update (id: string, params: Partial<Seller>): Promise<void> {
    const query: string[] = []
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.push(`${key} = '${value}'`)
      }
    })
    await PostgreClient.db.query(`
      UPDATE sellers SET ${query.join(', ')} WHERE id = ${id}
    `)
  }
}
