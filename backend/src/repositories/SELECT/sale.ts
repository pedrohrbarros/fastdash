import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type Sale } from '../../models/sale'

export class SelectSaleRepository {
  async selectAll (): Promise<Sale[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM sales
    `)
    const data: Sale[] = result.rows
    return data
  }

  async selectOne (id: number): Promise<Sale> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM sales id = ${id}
    `)
    const data: Sale[] = result.rows
    return data[0]
  }
}
