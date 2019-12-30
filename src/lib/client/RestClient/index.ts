import superagent from 'superagent'
import { BaseClient } from '../BaseClient'
import { ApiIdentifier, BaseApiDefinition } from '../../shared'
import { Logger } from '../../shared/types'
import { EventType } from '../BaseClient/ClientEventEmitter'

export abstract class RestClient<
  ApiDefinition extends BaseApiDefinition,
  Meta,
  Locals
> extends BaseClient<ApiDefinition, Meta> {
  public readonly apiIdentifier: ApiIdentifier
  public readonly locals: Locals

  constructor({
    apiIdentifier,
    locals,
    logger,
  }: {
    apiIdentifier: ApiIdentifier
    locals: Locals
    logger?: Logger | any
  }) {
    super()
    this.apiIdentifier = apiIdentifier
    this.locals = locals

    if (logger) {
      this.subscribeToLogEvents(logger)
    }
  }

  public subscribeToLogEvents(logger: Logger): void {
    this.callEvents.on(
      (data: {
        event: EventType
        resourceKey: string
        methodKey: string
        fnArgs: any
        meta: Partial<Meta>
        res?: any
      }) => {
        const { event, resourceKey, methodKey } = data
        let message

        if (event === 'call') {
          message = `calling ${resourceKey} -> ${methodKey}`
        } else {
          message = `got response from ${resourceKey} -> ${methodKey}`
        }
        logger.log({
          message,
          level: 'info',
          data,
        })
      }
    )
  }

  public abstract async createMeta(input: {
    resourceKey: string
    methodKey: string
    fnArgs: any
    locals: Locals
  }): Promise<Meta>

  public createUrl({
    host,
    resourceKey,
    methodKey,
  }: {
    host: string
    resourceKey: string
    methodKey: string
  }): string {
    return `${host}/rpc/${resourceKey}/${methodKey}`
  }

  public async handler(input: {
    resourceKey: string
    methodKey: string
    fnArgs: any
  }): Promise<any> {
    const { resourceKey, methodKey, fnArgs } = input
    const meta = await this.createMeta({
      fnArgs,
      locals: this.locals,
      methodKey,
      resourceKey,
    })
    this.callEvents.emit('call', { ...input, meta })

    const url = this.createUrl({
      host: this.apiIdentifier.host,
      resourceKey,
      methodKey,
    })

    const response = await superagent.post(url).send({ fnArgs, meta })
    const res = response.body

    this.callEvents.emit('response', { ...input, res, meta })
    return res
  }
}
