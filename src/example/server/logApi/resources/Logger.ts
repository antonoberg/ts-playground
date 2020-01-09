import { LogMessage } from '../../../shared'
import { Locals } from '../types'

export class Logger {
  public async log(input: LogMessage, locals: Locals): Promise<void> {
    console.log(`${input.data.meta.correlationId} ${input.message}`)
  }
}
