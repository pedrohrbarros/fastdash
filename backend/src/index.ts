/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { type Request, type Response } from 'express'
import { config } from 'dotenv'
import { PostgreClient } from './database/postgre'
import cors from 'cors'
import { GetUserController } from './controllers/GET/user'
import { PostUserController } from './controllers/POST/user'
import { DeleteUserController } from './controllers/DELETE/user'
import { PatchUserController } from './controllers/PATCH/user'
import { GetProductController } from './controllers/GET/product'
import { GetSellerController } from './controllers/GET/seller'
import { GetSaleController } from './controllers/GET/sale'
import { PostProductController } from './controllers/POST/product'
import { PostSellerController } from './controllers/POST/seller'
import { PostSaleController } from './controllers/POST/sale'
import { DeleteProductController } from './controllers/DELETE/product'
import { DeleteSellerController } from './controllers/DELETE/seller'
import { DeleteSaleController } from './controllers/DELETE/sale'
import { PatchProductController } from './controllers/PATCH/product'
import { PatchSellerController } from './controllers/PATCH/seller'
import { PatchSaleController } from './controllers/PATCH/sale'
import { GetLogController } from './controllers/GET/log'

const main = async (): Promise<void> => {
  config()
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', '*')
  })

  await PostgreClient.connect()

  app.get('/users', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetUserController().getAll({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.get('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetUserController().getOne({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.get('/products', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetProductController().getAll({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.get('/product/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetProductController().getOne({
      headers: req.headers,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.get('/sellers', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetSellerController().getAll({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.get('/seller/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetSellerController().getOne({
      headers: req.headers,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.get('/sales', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetSaleController().getAll({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.get('/sale/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetSaleController().getOne({
      headers: req.headers,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.get('/logs', async (req: Request, res: Response) => {
    const { statusCode, body } = await new GetLogController().getAll({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.post('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PostUserController().post({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.post('/login', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PostUserController().login({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.post('/product', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PostProductController().post({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.post('/seller', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PostSellerController().post({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.post('/sale', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PostSaleController().post({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.delete('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new DeleteUserController().delete({
      headers: req.headers
    })
    res.status(statusCode).send(body)
  })

  app.delete('/product/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new DeleteProductController().delete({
      headers: req.headers,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.delete('/seller/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new DeleteSellerController().delete({
      headers: req.headers,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.delete('/sale/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new DeleteSaleController().delete({
      headers: req.headers,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.patch('/user', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PatchUserController().patch({
      headers: req.headers,
      body: req.body
    })
    res.status(statusCode).send(body)
  })

  app.patch('/product/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PatchProductController().patch({
      headers: req.headers,
      body: req.body,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.patch('/seller/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PatchSellerController().patch({
      headers: req.headers,
      body: req.body,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  app.patch('/sale/:id', async (req: Request, res: Response) => {
    const { statusCode, body } = await new PatchSaleController().patch({
      headers: req.headers,
      body: req.body,
      params: { id: +req.params.id }
    })
    res.status(statusCode).send(body)
  })

  const port = process.env.PORT !== undefined ? process.env.PORT : 8000
  app.listen(port)
}

void main()
