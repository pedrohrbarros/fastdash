import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type Product } from '../../models/product'

export class SelectProductRepository {
  async selectAll (): Promise<Product[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM products
    `)
    const data: Product[] = result.rows
    return data
  }

  async selectOne (id: number): Promise<Product> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM products where id = ${id}
    `)
    const data: Product[] = result.rows
    return data[0]
  }
}
