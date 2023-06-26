import { type QueryResult } from 'pg'
import { SELECTSELLERPROPERTIES } from '../../controllers/GET/protocols'
import { PostgreClient } from '../../database/postgre'
import { type Seller } from '../../models/seller'

export class SelectSellerRepository {
  async selectAll (): Promise<Array<Pick<Seller, 'id' | 'name'>>> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT ${SELECTSELLERPROPERTIES.LIST} FROM sellers
    `)
    const data: Array<Pick<Seller, 'id' | 'name'>> = result.rows
    return data
  }

  async selectOne (id: string): Promise<Seller> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT ${SELECTSELLERPROPERTIES.ALL} FROM sellers WHERE id = '${id}'
    `)
    const data: Seller[] = result.rows
    return data[0]
  }
}
