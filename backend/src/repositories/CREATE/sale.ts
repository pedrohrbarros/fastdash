import { PostgreClient } from '../../database/postgre'
import { type Sale } from '../../models/sale'

export class CreateSaleRepository {
  async create (params: Sale): Promise<void> {
    await PostgreClient.db.query(`
      INSER INTO sales (product_id, seller_id, sold_at) VALUES (${params.product_id}, ${params.seller_id}, ${params.sold_at})
    `)
  }
}
