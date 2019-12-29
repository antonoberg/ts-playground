import { MusicAPIDefinition, MusicAPIProviders } from '../../shared/apis'
import { ApiClient, RestTransportClient } from '../../../lib/client'

export function createMusicClient(): ApiClient<MusicAPIDefinition> {
  const restTransportClient = new RestTransportClient({ host: '127.0.0.1' })
  return new ApiClient<MusicAPIDefinition>(
    MusicAPIProviders,
    restTransportClient
  )
}
