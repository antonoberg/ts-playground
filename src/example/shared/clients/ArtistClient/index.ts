import { ArtistAPIDefinition } from '../../apis'
import { RestClient } from '../../../../lib/client'
import { ensureCorrelationId } from '../../utils'

export type ArtistClientLocals = {
  requestMeta?: {
    correlationId?: string
  }
}

export type RequestMeta = {
  correlationId: string
}

export class ArtistClient<
  ClientLocals extends ArtistClientLocals
> extends RestClient<ArtistAPIDefinition, RequestMeta, ClientLocals> {
  public async createMeta({
    locals = {},
  }: {
    locals: ArtistClientLocals
  }): Promise<RequestMeta> {
    return {
      correlationId: ensureCorrelationId(
        locals.requestMeta && locals.requestMeta.correlationId
      ),
    }
  }
}
