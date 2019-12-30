import { RequestMeta, SongClient } from '../../shared/clients/SongClient'
import { ArtistClient } from '../../shared/clients/ArtistClient'

export type ClientLocals = {
  requestMeta: {
    correlationId: string
  }
}

export type Clients = {
  artistClient: ArtistClient<ClientLocals>
  songClient: SongClient<ClientLocals>
}

export { RequestMeta }

export type Locals = {
  requestMeta: RequestMeta
  clients: Clients
}
