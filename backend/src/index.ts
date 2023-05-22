import express from 'express'
import { config } from 'dotenv'
import { GetUsersController } from './controllers/getUsers/getUsers'
import { PostgreSQLGetUsersData } from './db/getUsers/getUsers'

config()

const app = express()

const port = process.env.PORT !== null ? process.env.PORT : 8000

app.get('/users', async (req, res) => {
  const databaseGetUsersData = new PostgreSQLGetUsersData()

  const getUsersController = new GetUsersController(databaseGetUsersData)

  const { body, statusCode } = await getUsersController.handle()

  res.send(body).status(statusCode)
})

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
app.listen(port, () => { console.log(`listening on port ${port}!`) })
