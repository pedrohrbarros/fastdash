import { CREATEPRODUCTPROPERTIES } from '../../controllers/POST/protocols'
import { PostgreClient } from '../../database/postgre'
import { type Product } from '../../models/product'

export class CreateProductRepository {
  async create (params: Product): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO products (${CREATEPRODUCTPROPERTIES.CREATE}) VALUES ('${params.name}', '${params.price}')`
    )
  }
}
