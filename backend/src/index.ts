/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { type Request, type Response } from 'express'
import { config } from 'dotenv'
import { PostgreClient } from './database/postgre'
import cors from 'cors'
import { GetUserController } from './controllers/GET/users'
import { PostUserController } from './controllers/POST/user'
import { DeleteUserController } from './controllers/DELETE/user'
import { UpdateUserController } from './controllers/PATCH/user'

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

  app.post('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PostUserController().register({
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.delete('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new DeleteUserController().remove({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.patch('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new UpdateUserController().patch({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  const port = process.env.PORT !== undefined ? process.env.PORT : 8000
  app.listen(port)
}

void main()
