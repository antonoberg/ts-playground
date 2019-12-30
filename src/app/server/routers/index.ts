import { MusicAPIDefinition } from '../../shared/apis'
import { createRouter } from '../../../lib/server'
import { AggregatedSongProvider, AggregatedArtistProvider } from '../providers'
import { createMusicResolver } from '../resolvers'

type MyType = {
  req: any
}

type BaseWithB<T> = T extends (input: infer U) => infer R
  ? (input: U, serverArgs: MyType) => R
  : never

type Extends<T> = {
  [P in keyof T]: BaseWithB<T[P]>
}

type Tmp = {
  [P in keyof MusicAPIDefinition]: Extends<MusicAPIDefinition[P]>
}

export function createMusicRouter(): any {
  const aggregatedSongProvider = new AggregatedSongProvider()
  const aggregatedArtistProvider = new AggregatedArtistProvider()
  const musicResolver = createMusicResolver({
    artist: aggregatedArtistProvider,
    song: aggregatedSongProvider,
  })
  return createRouter<Tmp>(musicResolver)
}
