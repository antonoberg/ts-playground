import { IsNotEmpty } from 'class-validator'

/* eslint-disable @typescript-eslint/no-unused-vars */
export class Song {
  @IsNotEmpty()
  public title: string

  @IsNotEmpty()
  public id: string

  @IsNotEmpty()
  public artistIds: string[]

  constructor({
    title,
    id,
    artistIds,
  }: {
    title: string
    id: string
    artistIds: string[]
  }) {
    this.title = title
    this.id = id
    this.artistIds = artistIds
  }
}

export class NewSong {
  @IsNotEmpty()
  public title: string

  @IsNotEmpty()
  public artistIds: string[]

  constructor({ title, artistIds }: { title: string; artistIds: string[] }) {
    this.title = title
    this.artistIds = artistIds
  }
}

export interface SongResource {
  getById({ id }: { id: string }): Promise<Song>
  createOne(input: NewSong): Promise<Song>
  updateOne(input: Partial<Song>): Promise<Song>
}
