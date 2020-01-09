import { RestResolver } from '../../../../lib/server'
import { ArtistAPIDefinition } from '../../../shared'
import { Locals, RequestMeta } from '../types'

export class ArtistResolver extends RestResolver<
  ArtistAPIDefinition,
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
