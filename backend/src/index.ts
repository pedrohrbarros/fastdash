/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { config } from 'dotenv'
import { GetUsersController } from './controllers/getUsers/getUsers'
import { PostgreSQLGetUsersData } from './repositories/getUsers'
import { PostgreClient } from './database/postgre'

const main = async (): Promise<void> => {
  config()

  const app = express()

  await PostgreClient.connect()

  app.get('/users', async (req, res) => {
    const databaseGetUsersData = new PostgreSQLGetUsersData()

    const getUsersController = new GetUsersController(databaseGetUsersData)

    const { body, statusCode } = await getUsersController.handle()

    res.send(body).status(statusCode)
  })

  const port = process.env.PORT !== undefined ? process.env.PORT : 8000

  app.listen(port, () => {
    console.log(`listening on port ${port}!`)
  })
}

void main()
