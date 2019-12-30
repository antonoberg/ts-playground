import { AppWrapper, createApplication } from '../../../lib/server'
import { Config } from './config'
import { ArtistDataStore } from './resources'
import { ArtistResolver } from './resolver'

export function createApp(config: Config): AppWrapper {
  const artistDataStore = new ArtistDataStore()

  const artistResolver = new ArtistResolver({
    artist: artistDataStore,
  })

  return createApplication(config.api.host, artistResolver.createRouter())
}
