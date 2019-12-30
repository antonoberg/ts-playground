import {
  AggregatedSong,
  NewAggregatedSong,
  Artist,
} from '../../../shared/resources'
import { ensureValid } from '../../../../lib/shared/utils'
import { Locals } from '../types'

export class AggregatedSongResource {
  public async createOne(
    input: NewAggregatedSong,
    meta: Locals
  ): Promise<AggregatedSong> {
    const { songClient } = meta.clients

    const { artists = [], ...newSong } = await ensureValid(
      new NewAggregatedSong(input)
    )
    const artistIds = artists.map((artist: Artist) => {
      return artist.id
    })

    const song = await songClient.resources.song.createOne({
      ...newSong,
      artistIds,
    })
    return await ensureValid(new AggregatedSong({ ...song, artists: [] }))
  }

  public async getById(
    { id }: { id: string },
    meta: Locals
  ): Promise<AggregatedSong> {
    const { artistClient, songClient } = meta.clients

    const song = await songClient.resources.song.getById({ id })

    return await ensureValid(
      new AggregatedSong({
        ...song,
        artists: await Promise.all(
          song.artistIds.map(
            async (id: string): Promise<Artist> => {
              return await artistClient.resources.artist.getById({ id })
            }
          )
        ),
      })
    )
  }
}
