import { BaseApiDefinition, DefinitionWithLocals } from '../../shared'
import { ResolverEventEmitter } from './ResolverEventEmitter'

export abstract class BaseResolver<
  ApiDefinition extends BaseApiDefinition,
  Locals
> {
  public callEvents: ResolverEventEmitter<ApiDefinition, Locals>
  public resources: DefinitionWithLocals<ApiDefinition, Locals>

  constructor(resources: DefinitionWithLocals<ApiDefinition, Locals>) {
    this.resources = resources
    const callEvents = new ResolverEventEmitter<ApiDefinition, Locals>()

    this.callEvents = callEvents
  }

  public abstract async handler(input: {
    methodKey: string
    resourceKey: string
  }): Promise<any>
}
