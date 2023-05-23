/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { config } from 'dotenv'
import { GetUsersController } from './controllers/Users/GET/getUsers'
import { PostgreSQLGetUsersRepository } from './repositories/Users/get'
import { PostgreClient } from './database/postgre'
import { PostgreSQLCreateUserRepository } from './repositories/Users/create'
import { CreateUserControler } from './controllers/Users/POST/createUser'

const main = async (): Promise<void> => {
  config()

  // Defining the app to the API
  const app = express()

  // Convert the body to JSON
  app.use(express.json())

  // Connecting to database
  await PostgreClient.connect()

  // GET Method
  app.get('/users', async (req, res) => {
    // Get users data from Database
    const databaseGetUsersRepository = new PostgreSQLGetUsersRepository()

    // Taking the users returned from the database and inserting them into the default type defined using the controller
    const getUsersController = new GetUsersController(databaseGetUsersRepository)

    // Returning the body and status code to insert on the API
    const { body, statusCode } = await getUsersController.handle()

    // Sending to the API endpoint
    res.status(statusCode).send(body)
  })

  // POST Method
  app.post('/users', async (req, res) => {
    // Create repository to access the controller
    const databaseCreateUserRepository = new PostgreSQLCreateUserRepository()

    // Access the controller
    const createUserController = new CreateUserControler(databaseCreateUserRepository)

    // Returning the body and status code to insert on the API
    const { body, statusCode } = await createUserController.handle({
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  // Defining the port URL
  const port = process.env.PORT !== undefined ? process.env.PORT : 8000

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
}

void main()
