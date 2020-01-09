import { ArtistClient } from '../shared/clients/ArtistClient'
import { SongClient } from '../shared/clients/SongClient'
import { MusicClient } from '../shared/clients/MusicClient'
import { LogClient } from '../shared/clients/LogClient'

function bootstrapClients(): {
  artistClient: ArtistClient<any>
  musicClient: MusicClient<any>
  songClient: SongClient<any>
} {
  const logger = new LogClient({
    apiIdentifier: {
      host: 'http://127.0.0.1:3004',
      name: 'client',
    },
    locals: {},
  })

  const artistClient = new ArtistClient({
    apiIdentifier: {
      host: 'http://127.0.0.1:3002',
      name: 'client',
    },
    logger,
    locals: {},
  })

  const songClient = new SongClient({
    apiIdentifier: {
      host: 'http://127.0.0.1:3001',
      name: 'client',
    },
    locals: {},
    logger,
  })

  const musicClient = new MusicClient({
    apiIdentifier: {
      host: 'http://127.0.0.1:3000',
      name: 'client',
    },
    locals: {},
    logger,
  })
  return {
    artistClient,
    musicClient,
    songClient,
  }
}

async function main(): Promise<void> {
  try {
    const { artistClient, musicClient, songClient } = bootstrapClients()

    // random useage of callEvents event emitter
    musicClient.callEvents.on('call', 'aggregatedArtist', 'createOne', data => {
      console.log('Calling', data.methodKey)
    })

    const artist = await artistClient.resources.artist.createOne({
      name: 'Anton',
    })

    console.log('Created new artist', artist)

    const song = await songClient.resources.song.createOne({
      title: 'Hello',
      artistIds: [],
    })

    console.log('Created new song', song)

    const createdArtist = await musicClient.resources.aggregatedArtist.createOne(
      {
        name: 'Anton',
        songs: [],
      }
    )
    console.log('Created new aggregated artist: ', createdArtist)

    const createdSong = await musicClient.resources.aggregatedSong.createOne({
      title: 'Trala',
      artists: [createdArtist],
    })

    console.log(
      'Created new aggregated song with associated artists: ',
      createdArtist
    )

    const aggArtist = await musicClient.resources.aggregatedArtist.getById({
      id: createdArtist.id,
    })

    console.log('Fetched aggregated artist by id', aggArtist)

    const aggSong = await musicClient.resources.aggregatedSong.getById({
      id: createdSong.id,
    })

    console.log('Fetched aggregated song by id', aggSong)
  } catch (err) {
    console.log('err', err)
  }
}

main()
