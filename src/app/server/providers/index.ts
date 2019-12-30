import {
  SongProvider as BaseSongProvider,
  ArtistProvider as BaseArtistProvider,
  AggregatedSongProvider as BaseAggregatedSongProvider,
  AggregatedArtistProvider as BaseAggregatedArtistProvider,
} from '../../shared/providers'
import { AggregatedArtist } from '../../shared/models'

type MyType = {
  req: any
}

export class SongProvider extends BaseSongProvider {}
export class ArtistProvider extends BaseArtistProvider {}
export class AggregatedSongProvider extends BaseAggregatedSongProvider {}
export class AggregatedArtistProvider extends BaseAggregatedArtistProvider {
  public async getById({ id }: { id: string }): Promise<AggregatedArtist> {
    return {
      id,
      name: 'Anton',
      songs: [],
    }
  }
}

// export type MusicAPIDefinition = {
//   artist: AggregatedArtistProvider
//   song: AggregatedSongProvider
// }

// type BaseWithB<T> = T extends (input: infer U) => infer R
//   ? (input: U, serverArgs: MyType) => R
//   : never

// type Extends<T> = {
//   [P in keyof T]: BaseWithB<T[P]>
// }

// type Tmp = {
//   [P in keyof MusicAPIDefinition]: Extends<MusicAPIDefinition[P]>
// }

// const a: Tmp = {
//   artist: {
//     getById: () => {

//     }
//   },
// }

// const a: Partial = {
//   getById(),
// }
