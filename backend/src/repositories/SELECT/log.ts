import { type QueryResult } from 'pg'
import { PostgreClient } from '../../database/postgre'
import { type Log } from '../../models/log'

export class SelectLogRepository {
  async selectAll (): Promise<Log[]> {
    const result: QueryResult<any> = await PostgreClient.db.query(`
      SELECT * FROM logs
    `)
    const data: Log[] = result.rows
    return data
  }
}
