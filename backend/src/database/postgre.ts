import { Pool, type PoolClient } from 'pg'

export const PostgreClient = {

  client: undefined as unknown as Pool,
  db: undefined as unknown as PoolClient,

  async connect (): Promise<void> {
    const host = process.env.POSTGRES_HOST
    const port = parseInt(process.env.POSTGRES_PORT as string)
    const database = process.env.POSTGRES_DB
    const user = process.env.POSTGRES_USER
    const password = process.env.POSTGRES_PASSWORD
    const client = new Pool({
      host,
      port,
      database,
      user,
      password
    })
    const db = await client.connect()
    this.client = client
    this.db = db

    console.log('Connected to Postgres database')
  }
}
