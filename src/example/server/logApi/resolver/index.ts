import { RestResolver } from '../../../../lib/server'
import { LogAPIDefinition } from '../../../shared'
import { Locals, RequestMeta } from '../types'

export class LogResolver extends RestResolver<
  LogAPIDefinition,
  RequestMeta,
  Locals
> {
  public async createLocals({
    requestMeta,
  }: {
    fnArgs: any
    requestMeta: RequestMeta
    methodKey: string
    req: any
    res: any
    resourceKey: string
  }): Promise<Locals> {
    return {
      requestMeta,
    }
  }
}
