import express, { Router } from 'express'
import { BaseResolver } from '../BaseResolver'
import { BaseApiDefinition, DefinitionWithLocals } from '../../shared'
import { getResourceKeyMethodKeyArray } from './createRestEndpointSpecifications'

export abstract class RestResolver<
  ApiDefinition extends BaseApiDefinition,
  RequestMeta,
  Locals
> extends BaseResolver<ApiDefinition, Locals> {
  constructor(resources: DefinitionWithLocals<ApiDefinition, Locals>) {
    super(resources)
  }

  public createRouter(): Router {
    const router = express.Router()

    const resourceKeyMethodKeyArray = getResourceKeyMethodKeyArray(
      this.resources
    )

    resourceKeyMethodKeyArray.forEach(({ resourceKey, methodKey }) => {
      const path = `/rpc/${resourceKey}/${methodKey}`
      router.use(path, async (req, res, next) => {
        try {
          res.send(await this.handler({ req, res, resourceKey, methodKey }))
        } catch (err) {
          next(err)
        }
      })
    })

    return router
  }

  public abstract async createLocals(input: {
    fnArgs: any
    requestMeta: RequestMeta
    methodKey: string
    req: any
    res: any
    resourceKey: string
  }): Promise<Locals>

  public async handler(input: {
    methodKey: string
    req: any
    res: any
    resourceKey: string
  }): Promise<any> {
    const { methodKey, req, res, resourceKey } = input
    const { fnArgs, meta } = req.body

    const locals = await this.createLocals({
      fnArgs,
      requestMeta: meta,
      methodKey,
      req,
      res,
      resourceKey,
    })
    const args = {
      fnArgs,
      locals,
      methodKey,
      resourceKey,
    }

    this.callEvents.emit('call', args)

    const response = await (this.resources as any)[resourceKey][methodKey](
      fnArgs,
      locals
    )

    const argsWithResponse = {
      ...args,
      response,
    }

    this.callEvents.emit('response', argsWithResponse)

    return response
  }
}
