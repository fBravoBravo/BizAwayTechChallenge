

import * as fastify from 'fastify';

export async function routes (fastify: fastify.FastifyInstance, options: fastify.FastifyPluginOptions) {
  fastify.get('/', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
    return { hello: 'world' }
  })
}