import { config } from '../config'
import { ArtistClient } from '../../../shared/clients/ArtistClient'
import { SongClient } from '../../../shared/clients/SongClient'
import { ClientLocals } from '../types'
import { LogClient } from '../../../shared/clients/LogClient'

export type Clients = {
  artistClient: ArtistClient<ClientLocals>
  songClient: SongClient<ClientLocals>
}

export function createClients(locals: ClientLocals): Clients {
  const logger = new LogClient<ClientLocals>({
    apiIdentifier: config.clientConfigs.log,
    locals,
  })

  const artistClient = new ArtistClient<ClientLocals>({
    apiIdentifier: config.clientConfigs.artist,
    locals,
    logger,
  })
  const songClient = new SongClient<ClientLocals>({
    apiIdentifier: config.clientConfigs.song,
    locals,
    logger,
  })
  return {
    artistClient,
    songClient,
  }
}
