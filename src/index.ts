// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
import { routes } from './routes/routes.js'

const server = Fastify({
  logger: true
})


server.register(routes);
// Run the server!
server.listen({ port: 3000 }, function (err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})