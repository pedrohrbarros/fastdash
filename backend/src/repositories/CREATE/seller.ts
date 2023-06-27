import { PostgreClient } from '../../database/postgre'
import { type Seller } from '../../models/seller'

export class CreateSellerRepository {
  async create (params: Seller): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO sellers (name, age, location) VALUES ('${params.name}', ${params.age}, '${params.location}')`
    )
  }
}
