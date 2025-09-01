import { app } from './app'
import { createServer } from 'http'
import { config } from '@config'

const server = createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`)
})
