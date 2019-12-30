import express from 'express'
import bodyParser from 'body-parser'
import { createMusicRouter } from './routers'

export const musicRouter = createMusicRouter()

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  console.log('called', req.url)
  next()
})

app.use(musicRouter)

app.listen(3000, () => {
  console.log('Im listening')
})
