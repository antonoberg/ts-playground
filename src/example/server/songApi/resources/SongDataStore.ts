import { ensureValid } from '../../../../lib/shared/utils'
import { Song, NewSong } from '../../../shared'

type Songs = {
  [key: string]: Song
}

let id = 0
export class SongDataStore {
  public static createId(): string {
    id += 1
    return `${id}`
  }
  private songs: Songs = {}
  public async getById({ id }: { id: string }): Promise<Song> {
    return new Song(this.songs[id])
  }
  public async createOne(newSong: NewSong): Promise<Song> {
    const song = await ensureValid(
      new Song({
        ...newSong,
        id: SongDataStore.createId(),
      })
    )

    this.songs[song.id] = song
    return await ensureValid(new Song(song))
  }

  public async updateOne(partialSong: Partial<Song>): Promise<Song> {
    const id = partialSong.id
    if (id === undefined) {
      throw new Error('Missing id')
    }
    const prevSong = await this.getById({ id })

    this.songs[prevSong.id] = new Song({
      ...prevSong,
      ...partialSong,
    })
    return await ensureValid(new Song(this.songs[prevSong.id]))
  }
}
