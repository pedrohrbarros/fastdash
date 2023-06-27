import { PostgreClient } from '../../database/postgre'
import { type Product } from '../../models/product'

export class UpdateProductRepository {
  async update (id: number, params: Partial<Product>): Promise<void> {
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
