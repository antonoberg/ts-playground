export const config = {
  api: {
    name: 'song',
    host: 'http://127.0.0.1:3001',
  },
  clientConfigs: {
    log: {
      name: 'log',
      host: 'http://127.0.0.1:3004',
    },
  },
}

export type Config = typeof config
