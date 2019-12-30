import {
  AggregatedArtist,
  NewAggregatedArtist,
  Song,
  NewSong,
} from '../../../shared/resources'
import { ensureValid } from '../../../../lib/shared/utils'
import { Locals } from '../types'

export class AggregatedArtistResource {
  public async createOne(
    input: NewAggregatedArtist,
    locals: Locals
  ): Promise<AggregatedArtist> {
    const { artistClient, songClient } = locals.clients

    const newAggregatedArtist = await ensureValid(
      new NewAggregatedArtist(input)
    )

    const { songs = [], ...newArtist } = newAggregatedArtist

    const artist = await artistClient.resources.artist.createOne(newArtist)

    await Promise.all(
      songs.map(async (song: NewSong | Song) => {
        if ('id' in song && song.id !== undefined) {
          const songToUpdate = await songClient.resources.song.getById({
            id: song.id,
          })

          songToUpdate.artistIds.push(artist.id)

          return await songClient.resources.song.updateOne(songToUpdate)
        }
        const newSong = await songClient.resources.song.createOne({
          ...song,
          artistIds: [artist.id],
        })
        return newSong.id
      })
    )

    return await ensureValid(new AggregatedArtist({ ...artist, songs: [] }))
  }

  public async getById(
    { id }: { id: string },
    locals: Locals
  ): Promise<AggregatedArtist> {
    const { artistClient } = locals.clients
    const artist = await artistClient.resources.artist.getById({ id })
    return await ensureValid(new AggregatedArtist({ ...artist, songs: [] }))
  }
}
