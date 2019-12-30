import { MusicAPIDefinition } from '../../apis'
import { RestClient } from '../../../../lib/client'
import { ensureCorrelationId } from '../../utils'

export type MusicClientLocals = {
  requestMeta?: {
    correlationId?: string
  }
}

export type RequestMeta = {
  correlationId: string
}

export class MusicClient<
  ClientLocals extends MusicClientLocals
> extends RestClient<MusicAPIDefinition, RequestMeta, ClientLocals> {
  public async createMeta({
    locals = {},
  }: {
    locals: MusicClientLocals
  }): Promise<RequestMeta> {
    return {
      correlationId: ensureCorrelationId(
        locals.requestMeta && locals.requestMeta.correlationId
      ),
    }
  }
}
