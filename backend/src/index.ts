/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { config } from 'dotenv'
import { PostgreClient } from './database/postgre'
import { GetUsersRepository } from './repositories/GET/users'
import { GetUsersController } from './controllers/GET/users'
import { CreateUserRepository } from './repositories/POST/users'
import { CreateUserController } from './controllers/POST/users'
import { UpdateUserRepository } from './repositories/PATCH/users'
import { UpdateUserController } from './controllers/PATCH/users'
import { DeleteUserRepository } from './repositories/DELETE/users'
import { DeleteUserController } from './controllers/DELETE/user'
import { headersAuthError } from './controllers/helpers'

const main = async (): Promise<void> => {
  config()

  // Defining the app to the API
  const app = express()

  // Convert the body to JSON
  app.use(express.json())

  // Connecting to database
  await PostgreClient.connect()

  // GET Method
  app.get('/users', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if ((authHeader?.startsWith('Bearer ')) === true) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      if (token === process.env.AUTH_TOKEN) {
        // Get users data from Database
        const databaseData = new GetUsersRepository()

        // Taking the users returned from the database and inserting them into the controller
        const controllerData = new GetUsersController(databaseData)

        // Returning the body and status code to insert on the API
        const { body, statusCode } = await controllerData.handle()

        // Sending to the API endpoint
        res.status(statusCode).send(body)
      } else {
        const { statusCode, body } = headersAuthError('Unauthorized to access this API')
        res.status(statusCode).send(body)
      }
    } else {
      const { statusCode, body } = headersAuthError('Unauthorized to access this API')
      res.status(statusCode).send(body)
    }
  })

  // GET Method with params
  app.get('/users/:id', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if ((authHeader?.startsWith('Bearer ')) === true) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      if (token === process.env.AUTH_TOKEN) {
        // Get users data from Database
        const databaseData = new GetUsersRepository()

        // Taking the users returned from the database and inserting them into the controller
        const controllerData = new GetUsersController(databaseData)

        // Returning the body and status code to insert on the API
        const { body, statusCode } = await controllerData.handle({
          params: { id: req?.params?.id }
        })

        // Sending to the API endpoint
        res.status(statusCode).send(body)
      } else {
        const { statusCode, body } = headersAuthError('Unauthorized to access this API')
        res.status(statusCode).send(body)
      }
    } else {
      const { statusCode, body } = headersAuthError('Unauthorized to access this API')
      res.status(statusCode).send(body)
    }
  })

  // POST Method
  app.post('/users', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if ((authHeader?.startsWith('Bearer ')) === true) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      if (token === process.env.AUTH_TOKEN) {
        // Create repository to create on database
        const createOnDatabase = new CreateUserRepository()

        // Access the controller to validate the data
        const createDataController = new CreateUserController(createOnDatabase)

        // Returning the body and status code
        const { body, statusCode } = await createDataController.handle({
          body: req?.body
        })

        res.status(statusCode).send(body)
      } else {
        const { statusCode, body } = headersAuthError('Unauthorized to access this API')
        res.status(statusCode).send(body)
      }
    } else {
      const { statusCode, body } = headersAuthError('Unauthorized to access this API')
      res.status(statusCode).send(body)
    }
  })

  app.patch('/users/:id', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if ((authHeader?.startsWith('Bearer ')) === true) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      if (token === process.env.AUTH_TOKEN) {
        // Create a repository to do the function of update on the database
        const updateOnDatabase = new UpdateUserRepository()

        // Access the conroller to validate data and fields to update
        const updateDataController = new UpdateUserController(updateOnDatabase)

        // Returning the body and status code
        const { body, statusCode } = await updateDataController.handle({
          params: { id: req?.params?.id },
          body: req?.body,
          permission: req?.body?.permission
        })

        res.status(statusCode).send(body)
      } else {
        const { statusCode, body } = headersAuthError('Unauthorized to access this API')
        res.status(statusCode).send(body)
      }
    } else {
      const { statusCode, body } = headersAuthError('Unauthorized to access this API')
      res.status(statusCode).send(body)
    }
  })

  app.delete('/users/:id', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if ((authHeader?.startsWith('Bearer ')) === true) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      if (token === process.env.AUTH_TOKEN) {
        // Create a repository to do the function of delete the user on the database
        const deleteOnDatabase = new DeleteUserRepository()

        // Access the controller to do the validations and return to the repository the id
        const deleteDataController = new DeleteUserController(deleteOnDatabase)

        // Returning the body and satus code and passing the parameters
        const { body, statusCode } = await deleteDataController.handle({
          params: { id: req?.params?.id },
          body: req?.body,
          permission: req?.body?.permission
        })

        res.status(statusCode).send(body)
      } else {
        const { statusCode, body } = headersAuthError('Unauthorized to access this API')
        res.status(statusCode).send(body)
      }
    } else {
      const { statusCode, body } = headersAuthError('Unauthorized to access this API')
      res.status(statusCode).send(body)
    }
  })

  // Defining the port URL
  const port = process.env.PORT !== undefined ? process.env.PORT : 8000

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
}

void main()
