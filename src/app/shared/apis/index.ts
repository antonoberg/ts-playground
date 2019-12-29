import { AggregatedSongProvider, AggregatedArtistProvider } from '../providers'

export type MusicAPIDefinition = {
  artist: AggregatedArtistProvider
  song: AggregatedSongProvider
}

export const MusicAPIProviders = {
  artist: AggregatedArtistProvider,
  song: AggregatedSongProvider,
}
