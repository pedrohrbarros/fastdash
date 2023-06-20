/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { config } from 'dotenv'
import { PostgreClient } from './database/postgre'
import cors from 'cors'
import { GetUserController } from './controllers/GET/users'

const main = async (): Promise<void> => {
  config()
  const app = express()
  app.use(express.json())
  app.use(cors())

  await PostgreClient.connect()

  app.get('/users', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetUserController().get()
    res.status(statusCode).send(body)
  })

  app.get('/login', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetUserController().login({
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.get('/profile', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetUserController().getProfile({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  // app.get('/users/:id', async (req: Request, res: Response) => {
  //   const getData = new GetUsersRepository()
  //   const validateData = new GetUsersController(getData)
  //   const { body, statusCode } = await validateData.handle({
  //     params: req?.params
  //   })
  //   res.status(statusCode).send(body)
  // })

  // app.post('/users', async (req: Request, res: Response) => {
  //   const getData = new CreateUserRepository()
  //   const validateData = new CreateUserController(getData)
  //   const { body, statusCode } = await validateData.handle({
  //     body: req?.body
  //   })
  //   res.status(statusCode).send(body)
  // })

  // app.patch('/users/:id', async (req: Request, res: Response) => {
  //   const updateOnDatabase = new UpdateUserRepository()
  //   const updateDataController = new UpdateUserController(updateOnDatabase)
  //   const { body, statusCode } = await updateDataController.handle({
  //     headers: req?.headers,
  //     body: req?.body
  //   })
  //   res.status(statusCode).send(body)
  // })

  // app.delete('/users/:id', async (req: Request, res: Response) => {
  //   const deleteOnDatabase = new DeleteUserRepository()
  //   const deleteDataController = new DeleteUserController(deleteOnDatabase)
  //   const { body, statusCode } = await deleteDataController.handle({
  //     headers: req?.headers,
  //     body: req?.body
  //   })

  //   res.status(statusCode).send(body)
  // })

  const port = process.env.PORT !== undefined ? process.env.PORT : 8000
  app.listen(port)
}

void main()
