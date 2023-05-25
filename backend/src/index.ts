/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { config } from 'dotenv'
import { PostgreClient } from './database/postgre'
import { GetUsersRepository } from './repositories/GET/users'
import { GetUsersController } from './controllers/GET/users'
import { CreateUserRepository } from './repositories/POST/users'
import { CreateUserController } from './controllers/POST/users'

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
    const databaseData = new GetUsersRepository()

    // Taking the users returned from the database and inserting them into the controller
    const controllerData = new GetUsersController(databaseData)

    // Returning the body and status code to insert on the API
    const { body, statusCode } = await controllerData.handle()

    // Sending to the API endpoint
    res.status(statusCode).send(body)
  })

  // GET Method with params
  app.get('/users/:id', async (req, res) => {
    // Get users data from Database
    const databaseData = new GetUsersRepository()

    // Taking the users returned from the database and inserting them into the controller
    const controllerData = new GetUsersController(databaseData)

    // Returning the body and status code to insert on the API
    const { body, statusCode } = await controllerData.handle({
      params: req.params.id
    })

    // Sending to the API endpoint
    res.status(statusCode).send(body)
  })

  // POST Method
  app.post('/users', async (req, res) => {
    // Create repository to create on database
    const createOnDatabase = new CreateUserRepository()

    // Access the controller to validate the data
    const createDataController = new CreateUserController(createOnDatabase)

    // Returning the body and status code
    const { body, statusCode } = await createDataController.handle({
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
