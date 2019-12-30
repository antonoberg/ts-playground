import { RestResolver } from '../../../../lib/server'
import { MusicAPIDefinition } from '../../../shared'
import { Locals, RequestMeta } from '../types'
import { createClients } from './createClients'

export class MusicResolver extends RestResolver<
  MusicAPIDefinition,
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
    const locals = {
      requestMeta,
    }

    return {
      ...locals,
      clients: createClients(locals),
    }
  }
}
