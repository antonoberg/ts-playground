import { Artist, NewArtist } from '../../../shared'
import { ensureValid } from '../../../../lib/shared/utils'

type Artists = {
  [key: string]: Artist
}

let artistId = 0
export class ArtistDataStore {
  public static createId(): string {
    artistId += 1
    return `${artistId}`
  }
  private artists: Artists = {}
  public async getById({ id }: { id: string }): Promise<Artist> {
    return new Artist(this.artists[id])
  }
  public async createOne(input: NewArtist): Promise<Artist> {
    const newArtist = await ensureValid(new NewArtist(input))

    const artist: Artist = {
      ...newArtist,
      id: ArtistDataStore.createId(),
    }
    this.artists[artist.id] = artist
    const res = await ensureValid(new Artist(artist))

    return res
  }

  public async updateOne(partialArtist: Partial<Artist>): Promise<Artist> {
    const id = partialArtist.id
    if (id === undefined) {
      throw new Error('Missing id')
    }
    const prevArtist = await this.getById({ id })

    this.artists[prevArtist.id] = {
      ...prevArtist,
      ...partialArtist,
    }

    return await ensureValid(new Artist(this.artists[prevArtist.id]))
  }
}
