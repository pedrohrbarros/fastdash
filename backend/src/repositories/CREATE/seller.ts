import { CREATESELLERPROPERTIES } from '../../controllers/POST/protocols'
import { PostgreClient } from '../../database/postgre'
import { type Seller } from '../../models/seller'

export class CreateSellerRepository {
  async create (params: Seller): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO sellers (${CREATESELLERPROPERTIES.CREATE}) VALUES ('${params.name}', ${params.age}, '${params.location}')`
    )
  }
}
