import { createMusicClient } from './apiClients'

export const musicClient = createMusicClient()

async function main(): Promise<void> {
  try {
    const res = await musicClient.providers.artist.getById({ id: '123' })
    console.log('res', res)
  } catch (err) {
    console.log('err', err)
  }
}

main()
