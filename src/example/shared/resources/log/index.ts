import { IsNotEmpty } from 'class-validator'

/* eslint-disable @typescript-eslint/no-unused-vars */
export class LogMessage {
  @IsNotEmpty()
  public level: string

  @IsNotEmpty()
  public message: string

  public data?: any

  constructor({ message, level, data }: LogMessage) {
    this.message = message
    this.level = level
    this.data = data
  }
}

export interface LogResource {
  log(logMessage: LogMessage, meta?: any): Promise<void>
}
