/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty } from 'class-validator'
import { Artist } from '../artist'
import { Song } from '../song'

export class NewAggregatedSong {
  @IsNotEmpty()
  public title: string

  @IsNotEmpty()
  public artists: Array<Artist> = []

  constructor({ title, artists }: { title: string; artists: Array<Artist> }) {
    this.title = title
    this.artists = artists
  }
}

export class AggregatedSong extends Song {
  @IsNotEmpty()
  public artists: Array<Artist>

  constructor(input: AggregatedSong) {
    super(input)
    this.artists = input.artists
  }
}

export interface AggregatedSongResource {
  getById({ id }: { id: string }): Promise<AggregatedSong>
  createOne(input: NewAggregatedSong): Promise<AggregatedSong>
}
