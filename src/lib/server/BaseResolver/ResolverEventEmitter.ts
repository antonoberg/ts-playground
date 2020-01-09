import { BaseApiDefinition, FirstParameter, ThenArg } from '../../shared/types'
import { EventEmitter2 } from 'eventemitter2'

export type EventType = 'call' | 'response'

export const eventTypes: EventType[] = ['call', 'response']

export class ResolverEventEmitter<
  ApiDefinition extends BaseApiDefinition,
  Locals
> {
  private eventEmitter: EventEmitter2
  constructor() {
    this.eventEmitter = new EventEmitter2()
  }

  public on(
    fn: ({
      event,
      resourceKey,
      methodKey,
      fnArgs,
      locals,
      res,
    }: {
      event: EventType
      resourceKey: string
      methodKey: string
      fnArgs: any
      locals: Partial<Locals>
      res?: any
    }) => void
  ): void

  public on<ProvidedEventType extends EventType>(
    event: ProvidedEventType,
    fn: ({
      event,
      resourceKey,
      methodKey,
      fnArgs,
      locals,
      res,
    }: {
      event: ProvidedEventType
      resourceKey: keyof ApiDefinition
      methodKey: string
      fnArgs: any
      locals: Partial<Locals>
      res?: any
    }) => void
  ): void

  public on<
    ProvidedEventType extends EventType,
    ResourceKey extends keyof ApiDefinition
  >(
    event: ProvidedEventType,
    resourceKey: ResourceKey,
    fn: ({
      event,
      resourceKey,
      methodKey,
      fnArgs,
      locals,
      res,
    }: {
      event: ProvidedEventType
      resourceKey: ResourceKey
      methodKey: keyof ApiDefinition[ResourceKey]
      fnArgs: any
      locals: Partial<Locals>
      res?: any
    }) => void
  ): void

  public on<
    ProvidedEventType extends EventType,
    ResourceKey extends keyof ApiDefinition,
    MethodKey extends keyof ApiDefinition[ResourceKey]
  >(
    event: ProvidedEventType,
    resourceKey: ResourceKey,
    methodKey: MethodKey,
    fn: ({
      event,
      resourceKey,
      methodKey,
      fnArgs,
      locals,
      res,
    }: {
      event: ProvidedEventType
      resourceKey: ResourceKey
      methodKey: MethodKey
      fnArgs: FirstParameter<ApiDefinition[ResourceKey][MethodKey]>
      locals: Partial<Locals>
      res: ProvidedEventType extends 'result'
        ? ThenArg<ReturnType<ApiDefinition[ResourceKey][MethodKey]>>
        : undefined
    }) => void
  ): void
  public on(a: any, b?: any, c?: any, d?: any): void {
    if (d) {
      this.eventEmitter.on(`${a}:${b}:${c}`, d)
    } else if (c) {
      this.eventEmitter.on(`${a}:${b}`, c)
    } else if (b) {
      this.eventEmitter.on(`${a}`, b)
    } else {
      eventTypes.forEach((event: EventType) => {
        this.eventEmitter.on(event, a)
      })
    }
  }

  public emit = (
    event: EventType,
    {
      resourceKey,
      methodKey,
      fnArgs,
      locals,
      res,
    }: {
      resourceKey: string
      methodKey: string
      fnArgs: any
      locals: any
      res?: any
    }
  ): void => {
    const payLoad = {
      fnArgs,
      locals,
      methodKey,
      resourceKey,
      res,
    }
    this.eventEmitter.emit(event, payLoad)
    this.eventEmitter.emit(`${event}:${resourceKey}`, payLoad)
    this.eventEmitter.emit(`${event}:${resourceKey}:${methodKey}`, payLoad)
  }
}
