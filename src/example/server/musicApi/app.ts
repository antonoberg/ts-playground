import { AppWrapper, createApplication } from '../../../lib/server'
import { Config } from './config'
import { MusicResolver } from './resolver'
import { AggregatedSongResource, AggregatedArtistResource } from './resources'

export function createApp(config: Config): AppWrapper {
  const aggregatedSongResource = new AggregatedSongResource()
  const aggregatedArtistResource = new AggregatedArtistResource()

  const musicResolver = new MusicResolver({
    aggregatedArtist: aggregatedArtistResource,
    aggregatedSong: aggregatedSongResource,
  })

  return createApplication(config.api.host, musicResolver.createRouter())
}
