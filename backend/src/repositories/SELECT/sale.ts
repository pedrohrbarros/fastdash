import { type QueryResult } from 'pg'
import { SELECTSALEPROPERTIES } from '../../controllers/GET/protocols'
import { PostgreClient } from '../../database/postgre'
import { type Sale } from '../../models/sale'

interface SalesInfo {
  id: string
  seller_name: string
  product_name: string
}

export class SelectSaleRepository {
  async selectAll (): Promise<SalesInfo[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT ${SELECTSALEPROPERTIES.LIST} FROM sales sa INNER JOIN sellers s ON s.id = sa.seller_id INNER JOIN products p ON p.id = sa.product_id
    `)
    const data: SalesInfo[] = result.rows
    return data
  }

  async selectOne (id: string): Promise<Sale> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT ${SELECTSALEPROPERTIES.ALL} FROM sales sa INNER JOIN sellers s ON s.id = sa.seller_id INNER JOIN products p ON p.id = sa.product_id WHERE  sa.id = '${id}'
    `)
    const data: Sale[] = result.rows
    return data[0]
  }
}
