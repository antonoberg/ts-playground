import express, { Application, Router } from 'express'
import bodyParser from 'body-parser'

export type AppWrapper = {
  app: Application
  listen: Function
}

export function createApplication(host: string, router: Router): AppWrapper {
  const app = express()
  app.use(bodyParser.json())
  app.use((req, _, next) => {
    next()
  })

  app.use(router)

  app.use((req, _, next) => {
    console.log(`${req.url} not found`)
    next()
  })

  const port = host.split(':').pop()

  const listen = (): void => {
    app.listen(port, () => {
      console.log('Api listening to port:', port)
    })
  }

  return { app, listen }
}
