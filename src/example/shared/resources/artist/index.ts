import { IsNotEmpty } from 'class-validator'

/* eslint-disable @typescript-eslint/no-unused-vars */
export class Artist {
  @IsNotEmpty()
  public name: string

  @IsNotEmpty()
  public id: string

  constructor({ name, id }: { name: string; id: string }) {
    this.name = name
    this.id = id
  }
}

export class NewArtist {
  @IsNotEmpty()
  public name: string

  constructor({ name }: { name: string }) {
    this.name = name
  }
}

export interface ArtistResource {
  getById({ id }: { id: string }): Promise<Artist>
  createOne(input: NewArtist): Promise<Artist>
  updateOne(input: Partial<Artist>): Promise<Artist>
}
