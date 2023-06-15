import { PostgreClient } from '../database/postgre'
import { type User } from '../models/user'

export const getModelsSingleProperty = async (property: string): Promise<Partial<User[]>> => {
  const result = await PostgreClient.db.query(
    `SELECT ${property} FROM users`
  )
  const data: Partial<User[]> = result.rows
  return data
}
