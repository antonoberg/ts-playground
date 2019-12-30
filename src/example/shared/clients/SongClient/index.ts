import { SongAPIDefinition } from '../../apis'
import { RestClient } from '../../../../lib/client'
import { ensureCorrelationId } from '../../utils'

export type SongClientLocals = {
  requestMeta?: {
    correlationId?: string
  }
}

export type RequestMeta = {
  correlationId: string
}

export class SongClient<
  ClientLocals extends SongClientLocals
> extends RestClient<SongAPIDefinition, RequestMeta, ClientLocals> {
  public async createMeta({
    locals = {},
  }: {
    locals: SongClientLocals
  }): Promise<RequestMeta> {
    return {
      correlationId: ensureCorrelationId(
        locals.requestMeta && locals.requestMeta.correlationId
      ),
    }
  }
}
