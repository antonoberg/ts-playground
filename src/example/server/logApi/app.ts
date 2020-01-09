import { AppWrapper, createApplication } from '../../../lib/server'
import { Config } from './config'
import { Logger } from './resources'
import { LogResolver } from './resolver'

export function createApp(config: Config): AppWrapper {
  const logDataStore = new Logger()

  const logResolver = new LogResolver({
    log: logDataStore,
  })

  return createApplication(config.api.host, logResolver.createRouter())
}
