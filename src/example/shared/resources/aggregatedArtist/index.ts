/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, Length } from 'class-validator'
import { Artist } from '../artist'
import { NewSong, Song } from '../song'

export class AggregatedArtist extends Artist {
  @IsNotEmpty()
  public songs: Array<Song>

  @IsNotEmpty()
  public name: string

  @IsNotEmpty()
  public id: string
  constructor(input: AggregatedArtist) {
    super(input)
    this.songs = input.songs
    this.name = input.name
    this.id = input.id
  }
}

export class NewAggregatedArtist {
  @IsNotEmpty()
  public name: string

  @IsNotEmpty()
  public songs: Array<Song | NewSong> = []

  constructor({ name, songs }: { name: string; songs: Array<Song | NewSong> }) {
    this.name = name
    this.songs = songs
  }
}

export interface AggregatedArtistResource {
  getById({ id }: { id: string }): Promise<AggregatedArtist>
  createOne(input: NewAggregatedArtist): Promise<AggregatedArtist>
}
