import { BaseApiDefinition } from '../../shared'
import { createResourcesProxy } from './createResourcesProxy'
import { ClientEventEmitter } from './ClientEventEmitter'

export abstract class BaseClient<
  ApiDefinition extends BaseApiDefinition,
  Meta
> {
  public callEvents: ClientEventEmitter<ApiDefinition, Meta>
  public resources: ApiDefinition

  constructor() {
    const callEvents = new ClientEventEmitter<ApiDefinition, Meta>()
    const handler = this.handler.bind(this)

    this.resources = createResourcesProxy({
      handler,
    })
    this.callEvents = callEvents
  }

  public abstract async handler(input: {
    resourceKey: string
    methodKey: string
    fnArgs: any
    meta: any
  }): Promise<any>
}
