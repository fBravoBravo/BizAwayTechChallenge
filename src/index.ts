import Fastify from 'fastify'
import { routes } from './api/routes/routes.js';

const server = Fastify({
  logger: true
})

server.register(routes, { prefix: '/api' });

server.listen({ port: 3000 }, function (err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})