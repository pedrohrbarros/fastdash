import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type Seller } from '../../models/seller'

export class SelectSellerRepository {
  async selectAll (): Promise<Seller[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM sellers
    `)
    const data: Seller[] = result.rows
    return data
  }

  async selectOne (id: number): Promise<Seller> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM sellers WHERE id = ${id}
    `)
    const data: Seller[] = result.rows
    return data[0]
  }
}
