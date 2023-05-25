import { type IUpdateRepository } from '../../controllers/PATCH/protocols'
import { PostgreClient } from '../../database/postgre'
import { type User } from '../../models/user'

export class UpdateUserRepository implements IUpdateRepository<User> {
  async updateModel (id: string, params: Partial<User>): Promise<void> {
    const updateFields: string[] = []
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'permission') {
          return null
        }
        updateFields.push(`${key} = '${value}'`)
      }
    })
    await PostgreClient.db.query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ${id}`
    )
  }
}
