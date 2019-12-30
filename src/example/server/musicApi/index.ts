import { createApp } from './app'
import { config } from './config'

const { listen } = createApp(config)
listen()
