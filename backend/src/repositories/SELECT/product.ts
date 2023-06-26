import { type QueryResult } from 'pg'
import { SELECTPRODUCTPROPERTIES } from '../../controllers/GET/protocols'
import { PostgreClient } from '../../database/postgre'
import { type Product } from '../../models/product'

export class SelectProductRepository {
  async selectAll (): Promise<Product[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT ${SELECTPRODUCTPROPERTIES.ALL} FROM products
    `)
    const data: Product[] = result.rows
    return data
  }

  async selectOne (id: string): Promise<Product> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT ${SELECTPRODUCTPROPERTIES.ALL} FROM products where id = ${id}
    `)
    const data: Product[] = result.rows
    return data[0]
  }
}
