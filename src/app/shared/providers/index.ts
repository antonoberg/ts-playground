/* eslint-disable @typescript-eslint/no-unused-vars */
import { Artist, AggregatedArtist, AggregatedSong, Song } from '../models'

export class SongProvider {
  public async getById({ id }: { id: string }, serverArgs: any): Promise<Song> {
    throw new Error('implement')
  }
}

export class ArtistProvider {
  public async getById({ id }: { id: string }): Promise<Artist> {
    throw new Error('implement')
  }
}

export class AggregatedSongProvider {
  public async getById(
    { id }: { id: string },
    serverArgs: any
  ): Promise<AggregatedSong> {
    throw new Error('implement')
  }
}

export class AggregatedArtistProvider {
  public async getById({ id }: { id: string }): Promise<AggregatedArtist> {
    throw new Error('implement')
  }
}
