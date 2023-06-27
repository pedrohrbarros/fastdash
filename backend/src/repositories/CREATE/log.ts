import { PostgreClient } from '../../database/postgre'
import { type Log } from '../../models/log'

export class CreateLogRepository {
  async create (params: Log): Promise<void> {
    await PostgreClient.db.query(`
      INSERT INTO logs (action, user_id)VALUES ('${params.action}', ${params.user_id})
    `)
  }
}
