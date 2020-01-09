import { AppWrapper, createApplication } from '../../../lib/server'
import { Config } from './config'
import { SongDataStore } from './resources'
import { SongResolver } from './resolver'

export function createApp(config: Config): AppWrapper {
  const songDataStore = new SongDataStore()

  const songResolver = new SongResolver({
    song: songDataStore,
  })

  return createApplication(config.api.host, songResolver.createRouter())
}
