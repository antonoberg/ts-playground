export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

export type FirstParameter<T> = T extends (first: infer T) => any ? T : never

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

export type MethodWithLocals<T, Locals> = T extends (input: infer U) => infer R
  ? (input: U, metaArgs: Locals) => R
  : never

export type ResourceWithLocals<T, Locals> = {
  [P in keyof T]: MethodWithLocals<T[P], Locals>
}

export type DefinitionWithLocals<T, Locals> = {
  [P in keyof T]: ResourceWithLocals<T[P], Locals>
}

export class BaseResource {}

export interface BaseApiDefinition {
  [key: string]: BaseResource
}

export type BaseApiDefinitionLocals<Locals> = DefinitionWithLocals<
  BaseApiDefinition,
  Locals
>

export type Logger = {
  log: (
    logMessage: {
      message: string
      level: string
      data: any
    },
    meta?: any
  ) => Promise<void>
}

export type ApiIdentifier = {
  name: string
  host: string
}

export type ApiConfig = ApiIdentifier & {}

// type ApiConfig = {}

export type ClientConfig = ApiIdentifier

export type Config = {
  api: ApiConfig
  clientConfigs: {
    [key: string]: ClientConfig
  }
}
