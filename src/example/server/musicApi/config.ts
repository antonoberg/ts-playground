export const config = {
  api: {
    name: 'music',
    host: 'http://127.0.0.1:3000',
  },
  clientConfigs: {
    artist: {
      name: 'artist',
      host: 'http://127.0.0.1:3002',
    },
    song: {
      name: 'song',
      host: 'http://127.0.0.1:3001',
    },
    log: {
      name: 'log',
      host: 'http://127.0.0.1:3004',
    },
  },
}

export type Config = typeof config
