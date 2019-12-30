import { LogAPIDefinition } from '../../apis'
import { RestClient } from '../../../../lib/client'
import { ensureCorrelationId } from '../../utils'

export type LogClientLocals = {
  requestMeta?: {
    correlationId?: string
  }
}

export type RequestMeta = {
  correlationId: string
}

export class LogClient<ClientLocals extends LogClientLocals> extends RestClient<
  LogAPIDefinition,
  RequestMeta,
  ClientLocals
> {
  public log: LogClient<
    ClientLocals
  >['resources']['log']['log'] = this.resources.log.log.bind(this)
  public async createMeta({
    locals = {},
  }: {
    locals: LogClientLocals
  }): Promise<RequestMeta> {
    return {
      correlationId: ensureCorrelationId(
        locals.requestMeta && locals.requestMeta.correlationId
      ),
    }
  }
}
