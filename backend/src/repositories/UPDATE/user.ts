import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class UpdateUserRepository {
  async update (id: number, params: Partial<User>): Promise<void> {
    const query: string[] = []
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.push(`${key} = '${value}'`)
      }
    })
    await PostgreClient.db.query(
      `UPDATE users SET ${query.join(', ')} WHERE id = ${id}`
    )
  }
}
