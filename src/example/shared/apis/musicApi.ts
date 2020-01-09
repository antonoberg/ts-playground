import { AggregatedSongResource, AggregatedArtistResource } from '../resources'

export type MusicAPIDefinition = {
  aggregatedArtist: AggregatedArtistResource
  aggregatedSong: AggregatedSongResource
}
