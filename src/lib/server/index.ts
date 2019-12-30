import { Providers } from '../shared'
import express, { Router } from 'express'

export class Resolver<T extends Providers> {
  public providers: T

  constructor(providers: T) {
    this.providers = providers
  }
}

export function createRouter<T>(resolver: Resolver<T>): Router {
  const router = express.Router()

  Object.keys(resolver.providers).forEach((providerKey: string) => {
    const provider = (resolver.providers as any)[providerKey]

    Object.getOwnPropertyNames(provider.constructor.prototype).forEach(
      (methodName: string) => {
        if (methodName !== 'constructor') {
          const path = `/rpc/${providerKey}/${methodName}`
          console.log(`Registering path: ${path}`)
          router.use(path, async (req, res, next) => {
            console.log(`${path} called`)
            const body = req.body

            try {
              res.send(await provider[methodName](body))
            } catch (err) {
              next(err)
            }
          })
        }
      }
    )
  })

  return router
}
