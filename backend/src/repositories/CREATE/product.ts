import { PostgreClient } from '../../database/postgre'
import { type Product } from '../../models/product'

export class CreateProductRepository {
  async create (params: Product): Promise<void> {
    await PostgreClient.db.query(
      `INSERT INTO products (name, price) VALUES ('${params.name}', ${params.price})`
    )
  }
}
