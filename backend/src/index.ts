import express from 'express'
import { config } from 'dotenv'

config()

const app = express()

const port = process.env.PORT !== null ? process.env.PORT : 8000

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
app.listen(port, () => { console.log(`listening on port ${port}!`) })

app.get('/', (req, res) => {
  res.send('Hello world')
})
