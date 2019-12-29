import { createMusicResolver } from './resolvers'
import { AggregatedSongProvider, AggregatedArtistProvider } from './providers'

const aggregatedSongProvider = new AggregatedSongProvider()
const aggregatedArtistProvider = new AggregatedArtistProvider()

export const musicResolver = createMusicResolver({
  artist: aggregatedArtistProvider,
  song: aggregatedSongProvider,
})
