import { RestResolver } from '../../../../lib/server'
import { SongAPIDefinition } from '../../../shared'
import { Locals, RequestMeta } from '../types'

export class SongResolver extends RestResolver<
  SongAPIDefinition,
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
