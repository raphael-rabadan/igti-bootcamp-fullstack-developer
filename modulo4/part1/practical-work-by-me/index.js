import config from './helper/config.js'

await config.connectToDatabase()
await config.startServer()
