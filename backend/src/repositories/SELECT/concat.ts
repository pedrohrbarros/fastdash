import { type QueryResult } from 'pg'
import { type Concat } from '../../models/concat'
import { PostgreClient } from '../../database/postgre'

export class SelectConcatRepository {
  async selectAll (): Promise<Concat[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
    select sa.product, p.price, sa.sold_at, sa.seller, s.age, s.location from sales sa
    inner join products p on sa.product = p.name
    inner join sellers s on sa.seller = s."name"
    `)
    const data: Concat[] = result.rows
    return data
  }
}
