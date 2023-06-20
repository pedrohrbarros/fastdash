import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class UpdateUserRepository {
  async update (id: string, params: Partial<User>): Promise<void> {
    const updateFields: string[] = []
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updateFields.push(`${key} = '${value}'`)
      }
    })
    await PostgreClient.db.query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ${id}`
    )
  }
}
