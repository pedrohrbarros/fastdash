import { CREATESALEPROPERTIES } from '../../controllers/POST/protocols'
import { PostgreClient } from '../../database/postgre'
import { type Sale } from '../../models/sale'

export class CreateSaleRepository {
  async create (params: Sale): Promise<void> {
    await PostgreClient.db.query(`
      INSER INTO sales (${CREATESALEPROPERTIES.CREATE}) VALUES ('${params.id}', '${params.product.id}', '${params.seller.id}')
    `)
  }
}
